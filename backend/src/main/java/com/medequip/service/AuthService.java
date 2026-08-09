package com.medequip.service;

import com.medequip.dto.request.LoginRequest;
import com.medequip.dto.request.RegisterRequest;
import com.medequip.dto.response.AuthResponse;

public interface AuthService {
    AuthResponse register(RegisterRequest request);
    AuthResponse login(LoginRequest request);
}
