package com.medequip.mapper;

import com.medequip.dto.response.CartItemResponse;
import com.medequip.dto.response.CartResponse;
import com.medequip.entity.Cart;
import com.medequip.entity.CartItem;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;

@Component
@RequiredArgsConstructor
public class CartMapper {

    @Value("${app.base-url}")
    private String baseUrl;

    public CartItemResponse toItemResponse(CartItem item) {
        if (item == null) return null;

        var product = item.getProduct();
        BigDecimal effectivePrice = (product.getDiscountPrice() != null)
                ? product.getDiscountPrice()
                : product.getPrice();

        String imageUrl = (product.getImage() != null)
                ? baseUrl + "/api/images/products/" + product.getImage()
                : null;

        return CartItemResponse.builder()
                .cartItemId(item.getId())
                .productId(product.getId())
                .productName(product.getName())
                .imageUrl(imageUrl)
                .price(product.getPrice())
                .discountPrice(product.getDiscountPrice())
                .quantity(item.getQuantity())
                .subtotal(effectivePrice.multiply(BigDecimal.valueOf(item.getQuantity())))
                .build();
    }

    public CartResponse toResponse(Cart cart) {
        if (cart == null) return null;

        List<CartItemResponse> itemResponses = cart.getItems()
                .stream()
                .map(this::toItemResponse)
                .toList();

        BigDecimal totalAmount = itemResponses.stream()
                .map(CartItemResponse::getSubtotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        int totalItems = cart.getItems().stream()
                .mapToInt(CartItem::getQuantity)
                .sum();

        return CartResponse.builder()
                .cartId(cart.getId())
                .items(itemResponses)
                .totalItems(totalItems)
                .totalAmount(totalAmount)
                .build();
    }
}
