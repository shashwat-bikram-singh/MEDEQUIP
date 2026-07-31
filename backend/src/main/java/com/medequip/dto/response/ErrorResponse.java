package com.medequip.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

/**
 * Error response returned by the GlobalExceptionHandler.
 *
 * <pre>
 * {
 *   "success": false,
 *   "message": "...",
 *   "timestamp": "...",
 *   "status": 400
 * }
 * </pre>
 */
@Getter
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ErrorResponse {

    @Builder.Default
    private final boolean success = false;

    private final String        message;
    private final int           status;
    private final LocalDateTime timestamp;
    private final Object        errors;   // field-level validation errors (nullable)
}
