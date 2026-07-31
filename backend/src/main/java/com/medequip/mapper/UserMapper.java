package com.medequip.mapper;

import com.medequip.dto.response.UserResponse;
import com.medequip.entity.User;
import org.springframework.stereotype.Component;

/**
 * Manual mapper — User entity ↔ UserResponse DTO.
 *
 * <p>We use manual mappers (no MapStruct) to keep the dependency list minimal
 * and to have explicit control over imageUrl construction.</p>
 */
@Component
public class UserMapper {

    public UserResponse toResponse(User user) {
        if (user == null) return null;
        return UserResponse.builder()
                .id(user.getId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .phone(user.getPhone())
                .role(user.getRole())
                .profileImage(user.getProfileImage())
                .createdAt(user.getCreatedAt())
                .build();
    }
}
