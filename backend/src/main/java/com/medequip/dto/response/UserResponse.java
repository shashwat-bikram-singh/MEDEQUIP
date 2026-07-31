package com.medequip.dto.response;

import com.medequip.entity.Role;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class UserResponse {

    private final Long          id;
    private final String        firstName;
    private final String        lastName;
    private final String        email;
    private final String        phone;
    private final Role          role;
    private final String        profileImage;
    private final LocalDateTime createdAt;
}
