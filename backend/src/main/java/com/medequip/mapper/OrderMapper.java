package com.medequip.mapper;

import com.medequip.dto.response.OrderItemResponse;
import com.medequip.dto.response.OrderResponse;
import com.medequip.entity.Order;
import com.medequip.entity.OrderItem;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;

@Component
@RequiredArgsConstructor
public class OrderMapper {

    @Value("${app.base-url}")
    private String baseUrl;

    public OrderItemResponse toItemResponse(OrderItem item) {
        if (item == null) return null;

        String imageUrl = (item.getProduct().getImage() != null)
                ? baseUrl + "/api/images/products/" + item.getProduct().getImage()
                : null;

        return OrderItemResponse.builder()
                .id(item.getId())
                .productId(item.getProduct().getId())
                .productName(item.getProduct().getName())
                .imageUrl(imageUrl)
                .price(item.getPrice())
                .quantity(item.getQuantity())
                .subtotal(item.getPrice().multiply(BigDecimal.valueOf(item.getQuantity())))
                .build();
    }

    public OrderResponse toResponse(Order order) {
        if (order == null) return null;

        List<OrderItemResponse> itemResponses = order.getOrderItems()
                .stream()
                .map(this::toItemResponse)
                .toList();

        return OrderResponse.builder()
                .id(order.getId())
                .userId(order.getUser().getId())
                .userEmail(order.getUser().getEmail())
                .orderDate(order.getOrderDate())
                .status(order.getStatus())
                .paymentMethod(order.getPaymentMethod())
                .paymentStatus(order.getPaymentStatus())
                .shippingAddress(order.getShippingAddress())
                .totalAmount(order.getTotalAmount())
                .orderItems(itemResponses)
                .build();
    }
}
