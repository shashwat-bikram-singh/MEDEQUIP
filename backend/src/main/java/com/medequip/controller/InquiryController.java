package com.medequip.controller;

import com.medequip.dto.request.B2BRequest;
import com.medequip.dto.request.ContactRequest;
import com.medequip.dto.response.ApiResponse;
import com.medequip.dto.response.InquiryResponse;
import com.medequip.entity.Inquiry;
import com.medequip.repository.InquiryRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Handles Contact form and B2B quote request submissions.
 * Submissions are public (no auth required). Listing is admin-only.
 */
@RestController
@RequestMapping("/api/inquiries")
@RequiredArgsConstructor
@Tag(name = "Inquiries", description = "Contact form and B2B quote submissions")
public class InquiryController {

    private final InquiryRepository inquiryRepository;

    // ── Public Submission Endpoints ───────────────────────────────────────────

    @PostMapping("/contact")
    @Operation(summary = "Submit a contact form message (public)")
    public ResponseEntity<ApiResponse<Void>> submitContact(@Valid @RequestBody ContactRequest request) {
        Inquiry inquiry = Inquiry.builder()
                .type("CONTACT")
                .name(request.getName())
                .email(request.getEmail())
                .subject(request.getSubject())
                .message(request.getMessage())
                .build();

        inquiryRepository.save(inquiry);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Message sent successfully! We'll reply within 24 hours."));
    }

    @PostMapping("/b2b")
    @Operation(summary = "Submit a B2B quote request (public)")
    public ResponseEntity<ApiResponse<Void>> submitB2B(@Valid @RequestBody B2BRequest request) {
        Inquiry inquiry = Inquiry.builder()
                .type("B2B")
                .name(request.getName())
                .email(request.getEmail())
                .message(request.getRequirements())
                .build();

        inquiryRepository.save(inquiry);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Quote request received! Our team will contact you within 4 business hours."));
    }

    // ── Admin Endpoints ──────────────────────────────────────────────────────

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "List all inquiries (ADMIN only)")
    public ResponseEntity<List<InquiryResponse>> getAllInquiries() {
        List<InquiryResponse> responses = inquiryRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(this::toResponse)
                .toList();
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/{type}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "List inquiries by type: CONTACT or B2B (ADMIN only)")
    public ResponseEntity<List<InquiryResponse>> getInquiriesByType(@PathVariable String type) {
        List<InquiryResponse> responses = inquiryRepository
                .findByTypeOrderByCreatedAtDesc(type.toUpperCase())
                .stream()
                .map(this::toResponse)
                .toList();
        return ResponseEntity.ok(responses);
    }

    // ── Mapper ───────────────────────────────────────────────────────────────

    private InquiryResponse toResponse(Inquiry inquiry) {
        return InquiryResponse.builder()
                .id(inquiry.getId())
                .type(inquiry.getType())
                .name(inquiry.getName())
                .email(inquiry.getEmail())
                .subject(inquiry.getSubject())
                .message(inquiry.getMessage())
                .status(inquiry.getStatus())
                .createdAt(inquiry.getCreatedAt())
                .build();
    }
}
