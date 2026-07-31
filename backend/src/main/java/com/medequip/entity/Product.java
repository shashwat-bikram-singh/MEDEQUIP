package com.medequip.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * Medical equipment product.
 *
 * <p>Each product belongs to a {@link Category} and has an optional
 * discount price for promotional campaigns.</p>
 */
@Entity
@Table(name = "products")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 200)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false, length = 100)
    private String brand;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    /** Regular selling price. */
    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal price;

    /** Optional discounted / sale price. NULL means no discount. */
    @Column(precision = 12, scale = 2)
    private BigDecimal discountPrice;

    @Column(nullable = false)
    @Builder.Default
    private Integer stock = 0;

    /** Stored filename of the primary product image. */
    @Column(length = 255)
    private String image;

    /** Computed/cached average rating (0.0 – 5.0). Updated on every review save. */
    @Column(nullable = false, precision = 3, scale = 2)
    @Builder.Default
    private Double rating = 0.0;

    /** Whether to feature this product on the homepage carousel. */
    @Column(nullable = false)
    @Builder.Default
    private Boolean isFeatured = false;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
}
