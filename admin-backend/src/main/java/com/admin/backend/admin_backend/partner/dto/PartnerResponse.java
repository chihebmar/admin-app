package com.admin.backend.admin_backend.partner.dto;

public record PartnerResponse(

        Long id,

        String code,

        String name,

        String email,

        String phone,

        String address,

        String typeCodeRef,
        String typeLabelFr,
        String typeLabelEn,

        String statusCodeRef,
        String statusLabelFr,
        String statusLabelEn
) {
}