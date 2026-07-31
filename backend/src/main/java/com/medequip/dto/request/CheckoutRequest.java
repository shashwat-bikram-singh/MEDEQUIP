package com.medequip.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CheckoutRequest {

    /** ID of the saved Address to ship to. */
    @NotNull(message = "Address ID is required")
    private Long addressId;

    /**
     * Payment method key.
     * Accepted values: "esewa", "khalti", "stripe", "cod"
     */
    @NotBlank(message = "Payment method is required")
    private String paymentMethod;
}
