package com.medequip.service.impl;

import com.medequip.dto.request.CheckoutRequest;
import com.medequip.dto.request.UpdateOrderStatusRequest;
import com.medequip.dto.response.OrderResponse;
import com.medequip.entity.*;
import com.medequip.exception.BadRequestException;
import com.medequip.exception.ResourceNotFoundException;
import com.medequip.mapper.OrderMapper;
import com.medequip.repository.AddressRepository;
import com.medequip.repository.CartRepository;
import com.medequip.repository.OrderRepository;
import com.medequip.repository.UserRepository;
import com.medequip.service.CartService;
import com.medequip.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository   orderRepository;
    private final CartRepository    cartRepository;
    private final AddressRepository addressRepository;
    private final UserRepository    userRepository;
    private final CartService       cartService;
    private final OrderMapper       orderMapper;

    @Override
    @Transactional
    public OrderResponse placeOrder(Long userId, CheckoutRequest request) {
        // Validate address ownership
        Address address = addressRepository.findById(request.getAddressId())
                .orElseThrow(() -> new ResourceNotFoundException("Address", request.getAddressId()));

        if (!address.getUser().getId().equals(userId)) {
            throw new BadRequestException("Address does not belong to the current user");
        }

        // Get cart
        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new BadRequestException("Cart not found for user"));

        if (cart.getItems().isEmpty()) {
            throw new BadRequestException("Cannot place order with an empty cart");
        }

        // Build order
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", userId));

        Order order = Order.builder()
                .user(user)
                .paymentMethod(request.getPaymentMethod())
                .shippingAddress(formatAddress(address))
                .build();

        BigDecimal total = BigDecimal.ZERO;
        for (CartItem cartItem : cart.getItems()) {
            Product product = cartItem.getProduct();

            if (product.getStock() < cartItem.getQuantity()) {
                throw new BadRequestException(
                        "Insufficient stock for product: " + product.getName());
            }

            BigDecimal effectivePrice = (product.getDiscountPrice() != null)
                    ? product.getDiscountPrice()
                    : product.getPrice();

            OrderItem orderItem = OrderItem.builder()
                    .order(order)
                    .product(product)
                    .price(effectivePrice)
                    .quantity(cartItem.getQuantity())
                    .build();

            order.getOrderItems().add(orderItem);

            // Reduce stock
            product.setStock(product.getStock() - cartItem.getQuantity());

            total = total.add(effectivePrice.multiply(BigDecimal.valueOf(cartItem.getQuantity())));
        }

        order.setTotalAmount(total);

        Order saved = orderRepository.save(order);

        // Clear the cart after placing the order
        cartService.clearCart(userId);

        return orderMapper.toResponse(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public List<OrderResponse> getUserOrders(Long userId) {
        return orderRepository.findByUserIdOrderByOrderDateDesc(userId,
                        org.springframework.data.domain.Pageable.unpaged())
                .stream()
                .map(orderMapper::toResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public OrderResponse getOrderById(Long userId, Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order", orderId));

        // Allow access only to order owner or admins (admin check done in controller via @PreAuthorize)
        if (!order.getUser().getId().equals(userId)) {
            throw new BadRequestException("Order does not belong to the current user");
        }
        return orderMapper.toResponse(order);
    }

    @Override
    @Transactional
    public OrderResponse updateOrderStatus(Long orderId, UpdateOrderStatusRequest request) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order", orderId));
        order.setStatus(request.getStatus());
        return orderMapper.toResponse(orderRepository.save(order));
    }

    @Override
    @Transactional(readOnly = true)
    public List<OrderResponse> getAllOrders() {
        return orderRepository.findAll().stream()
                .map(orderMapper::toResponse)
                .toList();
    }

    // ── helpers ──────────────────────────────────────────────────────────────

    private String formatAddress(Address a) {
        return String.format("%s, %s, %s, %s, %s",
                a.getStreet(), a.getCity(), a.getState(), a.getZipCode(), a.getCountry());
    }
}
