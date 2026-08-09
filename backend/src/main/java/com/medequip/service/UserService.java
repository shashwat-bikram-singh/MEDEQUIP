package com.medequip.service;

import com.medequip.dto.request.AddressRequest;
import com.medequip.dto.request.ChangePasswordRequest;
import com.medequip.dto.request.UpdateProfileRequest;
import com.medequip.dto.response.AddressResponse;
import com.medequip.dto.response.UserResponse;

import java.util.List;

public interface UserService {
    UserResponse getProfile(Long userId);
    UserResponse updateProfile(Long userId, UpdateProfileRequest request);
    void changePassword(Long userId, ChangePasswordRequest request);

    List<AddressResponse> getAddresses(Long userId);
    AddressResponse addAddress(Long userId, AddressRequest request);
    AddressResponse updateAddress(Long userId, Long addressId, AddressRequest request);
    void deleteAddress(Long userId, Long addressId);
}
