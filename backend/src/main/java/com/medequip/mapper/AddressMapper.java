package com.medequip.mapper;

import com.medequip.dto.response.AddressResponse;
import com.medequip.entity.Address;
import org.springframework.stereotype.Component;

@Component
public class AddressMapper {

    public AddressResponse toResponse(Address address) {
        if (address == null) return null;
        return AddressResponse.builder()
                .id(address.getId())
                .country(address.getCountry())
                .state(address.getState())
                .city(address.getCity())
                .zipCode(address.getZipCode())
                .street(address.getStreet())
                .isDefault(address.getIsDefault())
                .build();
    }

    /** Formats an Address into a human-readable shipping snapshot string. */
    public String toAddressSnapshot(Address address) {
        return String.format("%s, %s, %s, %s, %s",
                address.getStreet(),
                address.getCity(),
                address.getState(),
                address.getZipCode(),
                address.getCountry());
    }
}
