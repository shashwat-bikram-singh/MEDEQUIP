package com.medequip.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AddressResponse {

    private final Long    id;
    private final String  country;
    private final String  state;
    private final String  city;
    private final String  zipCode;
    private final String  street;
    private final Boolean isDefault;
}
