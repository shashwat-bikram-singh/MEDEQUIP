package com.medequip.dto.response;

import com.medequip.entity.OrderStatus;
import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
public class OrderResponse {

    private final Long              id;
    private final Long              userId;
    private final String            userEmail;
    private final LocalDateTime     orderDate;
    private final OrderStatus       status;
    private final String            paymentMethod;
    private final String            paymentStatus;
    private final String            shippingAddress;
    private final BigDecimal        totalAmount;
    private final List<OrderItemResponse> orderItems;
}
