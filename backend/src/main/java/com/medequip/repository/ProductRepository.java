package com.medequip.repository;

import com.medequip.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long>,
        JpaSpecificationExecutor<Product> {

    // ── Featured products ───────────────────────────────────────────────────
    List<Product> findByIsFeaturedTrue();

    // ── Category filter ─────────────────────────────────────────────────────
    Page<Product> findByCategoryId(Long categoryId, Pageable pageable);

    // ── Brand filter ────────────────────────────────────────────────────────
    Page<Product> findByBrandIgnoreCase(String brand, Pageable pageable);

    // ── Keyword search (name + description) ─────────────────────────────────
    @Query("SELECT p FROM Product p WHERE " +
           "LOWER(p.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(p.description) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(p.brand) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    Page<Product> searchByKeyword(@Param("keyword") String keyword, Pageable pageable);

    // ── Price range ─────────────────────────────────────────────────────────
    Page<Product> findByPriceBetween(BigDecimal minPrice, BigDecimal maxPrice, Pageable pageable);

    // ── Low stock alert (for admin dashboard) ───────────────────────────────
    List<Product> findByStockLessThanEqual(int threshold);

    // ── Top selling products (joined via OrderItems) ─────────────────────────
    @Query("SELECT p FROM Product p " +
           "JOIN OrderItem oi ON oi.product.id = p.id " +
           "GROUP BY p.id " +
           "ORDER BY SUM(oi.quantity) DESC")
    List<Product> findTopSellingProducts(Pageable pageable);

    // ── Distinct brands list ─────────────────────────────────────────────────
    @Query("SELECT DISTINCT p.brand FROM Product p ORDER BY p.brand ASC")
    List<String> findAllDistinctBrands();
}
