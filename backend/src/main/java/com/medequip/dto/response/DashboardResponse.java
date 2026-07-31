package com.medequip.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;
import java.util.List;

/**
 * Admin dashboard summary response.
 */
@Getter
@Builder
public class DashboardResponse {

    private final long           totalUsers;
    private final long           totalOrders;
    private final BigDecimal     totalRevenue;
    private final long           pendingOrders;
    private final long           processingOrders;
    private final long           totalProducts;
    private final long           lowStockProducts;

    /** Top 10 selling products by quantity. */
    private final List<ProductResponse>  topSellingProducts;

    /** Products with stock ≤ 5. */
    private final List<ProductResponse>  lowStockProductsList;

    /** 10 most recent orders. */
    private final List<OrderResponse>    recentOrders;
}
