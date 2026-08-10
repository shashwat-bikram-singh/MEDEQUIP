package com.medequip.service.impl;

import com.medequip.dto.request.ReviewRequest;
import com.medequip.dto.response.ReviewResponse;
import com.medequip.entity.Product;
import com.medequip.entity.Review;
import com.medequip.entity.User;
import com.medequip.exception.BadRequestException;
import com.medequip.exception.ResourceNotFoundException;
import com.medequip.mapper.ReviewMapper;
import com.medequip.repository.ProductRepository;
import com.medequip.repository.ReviewRepository;
import com.medequip.repository.UserRepository;
import com.medequip.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository  reviewRepository;
    private final ProductRepository productRepository;
    private final UserRepository    userRepository;
    private final ReviewMapper      reviewMapper;

    @Override
    @Transactional(readOnly = true)
    public List<ReviewResponse> getProductReviews(Long productId) {
        if (!productRepository.existsById(productId)) {
            throw new ResourceNotFoundException("Product", productId);
        }
        return reviewRepository.findByProductIdOrderByCreatedAtDesc(productId, Pageable.unpaged())
                .stream()
                .map(reviewMapper::toResponse)
                .toList();
    }

    @Override
    @Transactional
    public ReviewResponse addReview(Long userId, Long productId, ReviewRequest request) {
        if (reviewRepository.existsByUserIdAndProductId(userId, productId)) {
            throw new BadRequestException("You have already reviewed this product");
        }

        User    user    = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", userId));
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product", productId));

        Review review = Review.builder()
                .user(user)
                .product(product)
                .rating(request.getRating())
                .comment(request.getComment())
                .build();

        Review saved = reviewRepository.save(review);

        // Recalculate product average rating
        Double avgRating = reviewRepository.calculateAverageRating(productId);
        product.setRating(avgRating != null ? BigDecimal.valueOf(avgRating) : BigDecimal.ZERO);
        productRepository.save(product);

        return reviewMapper.toResponse(saved);
    }

    @Override
    @Transactional
    public void deleteReview(Long userId, Long reviewId) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new ResourceNotFoundException("Review", reviewId));

        if (!review.getUser().getId().equals(userId)) {
            throw new BadRequestException("Review does not belong to the current user");
        }

        Long productId = review.getProduct().getId();
        reviewRepository.delete(review);

        // Recalculate product rating after deletion
        Double avgRating = reviewRepository.calculateAverageRating(productId);
        Product product = productRepository.findById(productId).orElse(null);
        if (product != null) {
            product.setRating(avgRating != null ? BigDecimal.valueOf(avgRating) : BigDecimal.ZERO);
            productRepository.save(product);
        }
    }
}
