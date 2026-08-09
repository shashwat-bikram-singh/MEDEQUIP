package com.medequip.service;

import com.medequip.dto.response.WishlistResponse;

import java.util.List;

public interface WishlistService {
    List<WishlistResponse> getWishlist(Long userId);
    WishlistResponse addToWishlist(Long userId, Long productId);
    void removeFromWishlist(Long userId, Long productId);
}
