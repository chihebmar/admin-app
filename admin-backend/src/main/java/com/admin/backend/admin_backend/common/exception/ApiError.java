package com.admin.backend.admin_backend.common.exception;

import java.time.Instant;

public record ApiError(
        int status,
        String message,
        Instant timestamp
) {
}