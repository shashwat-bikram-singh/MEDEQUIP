package com.medequip.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

/**
 * Paginated response wrapper — wraps a list of items with pagination metadata.
 *
 * @param <T> Element type.
 */
@Getter
@Builder
public class PageResponse<T> {

    private final List<T> content;
    private final int     pageNumber;
    private final int     pageSize;
    private final long    totalElements;
    private final int     totalPages;
    private final boolean last;
    private final boolean first;
}
