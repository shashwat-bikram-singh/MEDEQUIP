package com.medequip.dto.response;

import com.medequip.entity.Role;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class AuthResponse {

    private final String        token;
    private final String        tokenType;
    private final Long          userId;
    private final String        firstName;
    private final String        lastName;
    private final String        email;
    private final Role          role;
    private final LocalDateTime createdAt;
}
