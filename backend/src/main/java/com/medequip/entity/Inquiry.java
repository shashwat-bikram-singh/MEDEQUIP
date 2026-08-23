package com.medequip.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

/**
 * Stores contact form and B2B quote request submissions.
 *
 * <p>The {@code type} field distinguishes between general contact
 * messages and B2B procurement inquiries.</p>
 */
@Entity
@Table(name = "inquiries")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Inquiry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** "CONTACT" or "B2B" */
    @Column(nullable = false, length = 20)
    private String type;

    @Column(nullable = false, length = 150)
    private String name;

    @Column(nullable = false, length = 150)
    private String email;

    /** Subject line (Contact form) or null (B2B). */
    @Column(length = 200)
    private String subject;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String message;

    /** e.g. "NEW", "READ", "REPLIED" */
    @Column(nullable = false, length = 20)
    @Builder.Default
    private String status = "NEW";

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
}
