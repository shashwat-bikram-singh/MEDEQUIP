package com.medequip.repository;

import com.medequip.entity.Order;
import com.medequip.entity.OrderStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    // ── Customer's own orders ────────────────────────────────────────────────
    Page<Order> findByUserIdOrderByOrderDateDesc(Long userId, Pageable pageable);

    // ── Admin — filter by status ─────────────────────────────────────────────
    Page<Order> findByStatusOrderByOrderDateDesc(OrderStatus status, Pageable pageable);

    // ── Dashboard: count by status ───────────────────────────────────────────
    long countByStatus(OrderStatus status);

    // ── Dashboard: total revenue ─────────────────────────────────────────────
    @Query("SELECT COALESCE(SUM(o.totalAmount), 0) FROM Order o WHERE o.paymentStatus = 'PAID'")
    BigDecimal calculateTotalRevenue();

    // ── Dashboard: recent orders ─────────────────────────────────────────────
    List<Order> findTop10ByOrderByOrderDateDesc();
}
