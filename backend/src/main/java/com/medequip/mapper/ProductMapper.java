package com.medequip.mapper;

import com.medequip.dto.response.ProductResponse;
import com.medequip.entity.Product;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

/**
 * Mapper for {@link Product} → {@link ProductResponse}.
 *
 * <p>Constructs the full {@code imageUrl} using the configurable base URL
 * so the frontend never needs to know local file paths.</p>
 */
@Component
@RequiredArgsConstructor
public class ProductMapper {

    private final CategoryMapper categoryMapper;

    @Value("${app.base-url}")
    private String baseUrl;

    public ProductResponse toResponse(Product product) {
        if (product == null) return null;

        String imageUrl = (product.getImage() != null)
                ? baseUrl + "/api/images/products/" + product.getImage()
                : null;

        return ProductResponse.builder()
                .id(product.getId())
                .name(product.getName())
                .description(product.getDescription())
                .brand(product.getBrand())
                .category(categoryMapper.toResponse(product.getCategory()))
                .price(product.getPrice())
                .discountPrice(product.getDiscountPrice())
                .stock(product.getStock())
                .imageUrl(imageUrl)
                .rating(product.getRating())
                .isFeatured(product.getIsFeatured())
                .createdAt(product.getCreatedAt())
                .build();
    }
}
