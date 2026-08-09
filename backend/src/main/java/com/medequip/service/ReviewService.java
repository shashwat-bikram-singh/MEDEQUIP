package com.medequip.service;

import com.medequip.dto.request.ReviewRequest;
import com.medequip.dto.response.ReviewResponse;

import java.util.List;

public interface ReviewService {
    List<ReviewResponse> getProductReviews(Long productId);
    ReviewResponse addReview(Long userId, Long productId, ReviewRequest request);
    void deleteReview(Long userId, Long reviewId);
}
