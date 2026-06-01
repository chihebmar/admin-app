package com.admin.backend.admin_backend.partner.dto;

import jakarta.validation.constraints.NotBlank;

public record PartnerRequest(

        @NotBlank
        String code,

        @NotBlank
        String name,

        String email,

        String phone,

        String address,

        @NotBlank
        String typeCodeRef,

        @NotBlank
        String statusCodeRef
) {
}