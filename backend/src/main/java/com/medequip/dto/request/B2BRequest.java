package com.medequip.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class B2BRequest {

    @NotBlank(message = "Facility name is required")
    @Size(max = 150, message = "Facility name must not exceed 150 characters")
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Email must be valid")
    private String email;

    @NotBlank(message = "Requirements details are required")
    @Size(max = 5000, message = "Requirements must not exceed 5000 characters")
    private String requirements;
}
