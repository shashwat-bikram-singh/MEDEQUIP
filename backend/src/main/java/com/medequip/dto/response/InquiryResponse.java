package com.medequip.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class InquiryResponse {

    private final Long          id;
    private final String        type;
    private final String        name;
    private final String        email;
    private final String        subject;
    private final String        message;
    private final String        status;
    private final LocalDateTime createdAt;
}
