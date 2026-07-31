package com.medequip.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;

@Getter
@Builder
public class OrderItemResponse {

    private final Long       id;
    private final Long       productId;
    private final String     productName;
    private final String     imageUrl;
    private final BigDecimal price;
    private final Integer    quantity;
    private final BigDecimal subtotal;
}
