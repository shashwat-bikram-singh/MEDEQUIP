package com.medequip.service;

import com.medequip.dto.request.CartItemRequest;
import com.medequip.dto.response.CartResponse;

public interface CartService {
    CartResponse getCart(Long userId);
    CartResponse addItem(Long userId, CartItemRequest request);
    CartResponse updateItem(Long userId, Long cartItemId, int quantity);
    CartResponse removeItem(Long userId, Long cartItemId);
    void clearCart(Long userId);
}
