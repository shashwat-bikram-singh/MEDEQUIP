package com.medequip.controller;

import com.medequip.dto.request.AddressRequest;
import com.medequip.dto.request.ChangePasswordRequest;
import com.medequip.dto.request.UpdateProfileRequest;
import com.medequip.dto.response.AddressResponse;
import com.medequip.dto.response.ApiResponse;
import com.medequip.dto.response.UserResponse;
import com.medequip.entity.User;
import com.medequip.repository.UserRepository;
import com.medequip.service.FileStorageService;
import com.medequip.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@Tag(name = "Users", description = "User profile and address management")
public class UserController {

    private final UserService userService;
    private final FileStorageService fileStorageService;
    private final UserRepository userRepository;

    // ── Profile ───────────────────────────────────────────────────────────────

    @GetMapping("/me")
    @Operation(summary = "Get the current user's profile")
    public ResponseEntity<UserResponse> getProfile(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(userService.getProfile(user.getId()));
    }

    @PutMapping("/me")
    @Operation(summary = "Update the current user's profile")
    public ResponseEntity<UserResponse> updateProfile(
            @AuthenticationPrincipal User user,
            @Valid @RequestBody UpdateProfileRequest request) {
        return ResponseEntity.ok(userService.updateProfile(user.getId(), request));
    }

    @PutMapping("/me/password")
    @Operation(summary = "Change the current user's password")
    public ResponseEntity<Void> changePassword(
            @AuthenticationPrincipal User user,
            @Valid @RequestBody ChangePasswordRequest request) {
        userService.changePassword(user.getId(), request);
        return ResponseEntity.noContent().build();
    }

    // ── Addresses ─────────────────────────────────────────────────────────────

    @GetMapping("/me/addresses")
    @Operation(summary = "List all saved delivery addresses")
    public ResponseEntity<List<AddressResponse>> getAddresses(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(userService.getAddresses(user.getId()));
    }

    @PostMapping("/me/addresses")
    @Operation(summary = "Add a new delivery address")
    public ResponseEntity<AddressResponse> addAddress(
            @AuthenticationPrincipal User user,
            @Valid @RequestBody AddressRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(userService.addAddress(user.getId(), request));
    }

    @PutMapping("/me/addresses/{addressId}")
    @Operation(summary = "Update a saved address")
    public ResponseEntity<AddressResponse> updateAddress(
            @AuthenticationPrincipal User user,
            @PathVariable Long addressId,
            @Valid @RequestBody AddressRequest request) {
        return ResponseEntity.ok(userService.updateAddress(user.getId(), addressId, request));
    }

    @DeleteMapping("/me/addresses/{addressId}")
    @Operation(summary = "Delete a saved address")
    public ResponseEntity<Void> deleteAddress(
            @AuthenticationPrincipal User user,
            @PathVariable Long addressId) {
        userService.deleteAddress(user.getId(), addressId);
        return ResponseEntity.noContent().build();
    }

    // ── Profile Image ─────────────────────────────────────────────────────────

    @PostMapping("/me/profile-image")
    @Operation(summary = "Upload a profile picture")
    public ResponseEntity<ApiResponse<UserResponse>> uploadProfileImage(
            @AuthenticationPrincipal User user,
            @RequestParam("file") MultipartFile file) {

        // Delete old profile image if exists
        if (user.getProfileImage() != null) {
            fileStorageService.deleteProfileImage(user.getProfileImage());
        }

        String filename = fileStorageService.storeProfileImage(file);
        user.setProfileImage(filename);
        userRepository.save(user);

        // Return updated profile
        return ResponseEntity.ok(ApiResponse.success(
                "Profile image uploaded successfully",
                userService.getProfile(user.getId())));
    }
}
