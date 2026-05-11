package com.admin.backend.admin_backend.user.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record UserRequest(

        @NotBlank
        String firstName,

        @NotBlank
        String lastName,

        @Email
        @NotBlank
        String email,

        String password,

        @NotBlank
        String roleCodeRef,

        @NotBlank
        String statusCodeRef
) {
}