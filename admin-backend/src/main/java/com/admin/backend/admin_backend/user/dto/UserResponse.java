package com.admin.backend.admin_backend.user.dto;

import com.admin.backend.admin_backend.user.User;

public record UserResponse(

        Long id,

        String firstName,
        String lastName,
        String email,

        String roleCodeRef,
        String roleLabelFr,
        String roleLabelEn,

        String statusCodeRef,
        String statusLabelFr,
        String statusLabelEn

) {

    public static UserResponse fromEntity(User user) {

        return new UserResponse(

                user.getId(),

                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),

                user.getRole().getCodeRef(),
                user.getRole().getLabelFr(),
                user.getRole().getLabelEn(),

                user.getStatus().getCodeRef(),
                user.getStatus().getLabelFr(),
                user.getStatus().getLabelEn()
        );
    }
}