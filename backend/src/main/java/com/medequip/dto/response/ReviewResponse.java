package com.medequip.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class ReviewResponse {

    private final Long          id;
    private final Long          userId;
    private final String        userName;
    private final Long          productId;
    private final Integer       rating;
    private final String        comment;
    private final LocalDateTime createdAt;
}
