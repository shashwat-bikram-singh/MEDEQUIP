package com.medequip.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Builder
public class ProductResponse {

    private final Long             id;
    private final String           name;
    private final String           description;
    private final String           brand;
    private final CategoryResponse category;
    private final BigDecimal       price;
    private final BigDecimal       discountPrice;
    private final Integer          stock;

    /** Full URL to the product image (base-url + filename). */
    private final String           imageUrl;

    private final BigDecimal       rating;
    private final Boolean          isFeatured;
    private final LocalDateTime    createdAt;
}
