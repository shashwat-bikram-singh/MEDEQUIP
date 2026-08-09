package com.medequip.service.impl;

import com.medequip.dto.response.WishlistResponse;
import com.medequip.entity.Product;
import com.medequip.entity.User;
import com.medequip.entity.Wishlist;
import com.medequip.exception.BadRequestException;
import com.medequip.exception.ResourceNotFoundException;
import com.medequip.mapper.WishlistMapper;
import com.medequip.repository.ProductRepository;
import com.medequip.repository.UserRepository;
import com.medequip.repository.WishlistRepository;
import com.medequip.service.WishlistService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class WishlistServiceImpl implements WishlistService {

    private final WishlistRepository wishlistRepository;
    private final ProductRepository  productRepository;
    private final UserRepository     userRepository;
    private final WishlistMapper     wishlistMapper;

    @Override
    @Transactional(readOnly = true)
    public List<WishlistResponse> getWishlist(Long userId) {
        return wishlistRepository.findByUserId(userId)
                .stream()
                .map(wishlistMapper::toResponse)
                .toList();
    }

    @Override
    @Transactional
    public WishlistResponse addToWishlist(Long userId, Long productId) {
        if (wishlistRepository.existsByUserIdAndProductId(userId, productId)) {
            throw new BadRequestException("Product is already in wishlist");
        }

        User    user    = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", userId));
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product", productId));

        Wishlist entry = Wishlist.builder()
                .user(user)
                .product(product)
                .build();

        return wishlistMapper.toResponse(wishlistRepository.save(entry));
    }

    @Override
    @Transactional
    public void removeFromWishlist(Long userId, Long productId) {
        if (!wishlistRepository.existsByUserIdAndProductId(userId, productId)) {
            throw new ResourceNotFoundException("Wishlist entry not found for product id: " + productId);
        }
        wishlistRepository.deleteByUserIdAndProductId(userId, productId);
    }
}
