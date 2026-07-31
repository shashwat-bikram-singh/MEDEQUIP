package com.medequip.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class WishlistResponse {

    private final Long            id;
    private final ProductResponse product;
}
