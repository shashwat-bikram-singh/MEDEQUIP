package com.medequip.service;

import com.medequip.dto.request.CheckoutRequest;
import com.medequip.dto.request.UpdateOrderStatusRequest;
import com.medequip.dto.response.OrderResponse;

import java.util.List;

public interface OrderService {
    OrderResponse placeOrder(Long userId, CheckoutRequest request);
    List<OrderResponse> getUserOrders(Long userId);
    OrderResponse getOrderById(Long userId, Long orderId);
    OrderResponse updateOrderStatus(Long orderId, UpdateOrderStatusRequest request);
    List<OrderResponse> getAllOrders();
}
