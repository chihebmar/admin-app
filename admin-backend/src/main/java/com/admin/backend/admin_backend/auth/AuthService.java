package com.admin.backend.admin_backend.auth;

import com.admin.backend.admin_backend.auth.dto.AuthResponse;
import com.admin.backend.admin_backend.auth.dto.LoginRequest;
import com.admin.backend.admin_backend.common.exception.BadRequestException;
import com.admin.backend.admin_backend.security.JwtService;
import com.admin.backend.admin_backend.user.User;
import com.admin.backend.admin_backend.user.UserRepository;
import com.admin.backend.admin_backend.user.dto.UserResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthResponse login(LoginRequest request) {

        User user = userRepository.findByEmail(request.email())
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));

        if (!passwordEncoder.matches(request.password(), user.getPassword())) {
            throw new BadRequestException("Invalid credentials");
        }

        String token = jwtService.generateToken(
                user.getEmail(),
                user.getRole().getCodeRef()
        );

        return new AuthResponse(token);
    }

    public UserResponse getCurrentUser(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return UserResponse.fromEntity(user);
    }
}