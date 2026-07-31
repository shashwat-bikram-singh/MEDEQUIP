package com.medequip.entity;

import jakarta.persistence.*;
import lombok.*;

/**
 * A saved delivery/billing address belonging to a user.
 *
 * <p>Users may have multiple addresses. Orders snapshot their
 * address as a string; this table is for address management only.</p>
 */
@Entity
@Table(name = "addresses")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false, length = 100)
    private String country;

    @Column(nullable = false, length = 100)
    private String state;

    @Column(nullable = false, length = 100)
    private String city;

    @Column(nullable = false, length = 20)
    private String zipCode;

    @Column(nullable = false, length = 255)
    private String street;

    /** Marks this as the default shipping address. */
    @Column(nullable = false)
    @Builder.Default
    private Boolean isDefault = false;
}
