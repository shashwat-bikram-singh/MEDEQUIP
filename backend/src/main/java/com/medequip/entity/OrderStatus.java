package com.medequip.entity;

/**
 * Lifecycle statuses of an {@link Order}.
 */
public enum OrderStatus {
    PENDING,
    PROCESSING,
    SHIPPED,
    DELIVERED,
    CANCELLED
}
