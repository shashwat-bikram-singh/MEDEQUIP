package com.medequip.mapper;

import com.medequip.dto.response.WishlistResponse;
import com.medequip.entity.Wishlist;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class WishlistMapper {

    private final ProductMapper productMapper;

    public WishlistResponse toResponse(Wishlist wishlist) {
        if (wishlist == null) return null;
        return WishlistResponse.builder()
                .id(wishlist.getId())
                .product(productMapper.toResponse(wishlist.getProduct()))
                .build();
    }
}
