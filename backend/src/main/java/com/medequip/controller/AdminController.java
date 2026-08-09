package com.medequip.controller;

import com.medequip.dto.response.DashboardResponse;
import com.medequip.dto.response.OrderResponse;
import com.medequip.dto.response.ProductResponse;
import com.medequip.entity.Order;
import com.medequip.entity.OrderStatus;
import com.medequip.entity.Product;
import com.medequip.mapper.OrderMapper;
import com.medequip.mapper.ProductMapper;
import com.medequip.repository.OrderRepository;
import com.medequip.repository.ProductRepository;
import com.medequip.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;
    private final ProductMapper productMapper;
    private final OrderMapper orderMapper;

    @GetMapping("/dashboard")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<DashboardResponse> getDashboard() {
        long totalUsers = userRepository.count();
        long totalProducts = productRepository.count();
        long totalOrders = orderRepository.count();
        BigDecimal totalRevenue = orderRepository.calculateTotalRevenue();

        long pendingOrders = orderRepository.countByStatus(OrderStatus.PENDING);
        long processingOrders = orderRepository.countByStatus(OrderStatus.PROCESSING);

        List<Product> lowStock = productRepository.findByStockLessThanEqual(5);
        List<ProductResponse> lowStockResponses = lowStock.stream()
                .map(productMapper::toResponse)
                .collect(Collectors.toList());

        List<Product> topSelling = productRepository.findTopSellingProducts(PageRequest.of(0, 10));
        List<ProductResponse> topSellingResponses = topSelling.stream()
                .map(productMapper::toResponse)
                .collect(Collectors.toList());

        List<Order> recent = orderRepository.findTop10ByOrderByOrderDateDesc();
        List<OrderResponse> recentResponses = recent.stream()
                .limit(5)
                .map(orderMapper::toResponse)
                .collect(Collectors.toList());

        DashboardResponse response = DashboardResponse.builder()
                .totalUsers(totalUsers)
                .totalOrders(totalOrders)
                .totalRevenue(totalRevenue != null ? totalRevenue : BigDecimal.ZERO)
                .pendingOrders(pendingOrders)
                .processingOrders(processingOrders)
                .totalProducts(totalProducts)
                .lowStockProducts(lowStock.size())
                .topSellingProducts(topSellingResponses)
                .lowStockProductsList(lowStockResponses)
                .recentOrders(recentResponses)
                .build();

        return ResponseEntity.ok(response);
    }
}
