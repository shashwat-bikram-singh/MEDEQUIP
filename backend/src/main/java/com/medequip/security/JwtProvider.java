package com.medequip.security;

import com.medequip.entity.User;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

/**
 * Handles JWT token generation, validation, and claims extraction.
 *
 * <p>Uses JJWT 0.12.x modern API (no deprecated methods).</p>
 */
@Slf4j
@Component
public class JwtProvider {

    private final SecretKey secretKey;
    private final long      jwtExpirationMs;

    public JwtProvider(
            @Value("${app.jwt.secret}") String secret,
            @Value("${app.jwt.expiration-ms}") long jwtExpirationMs) {

        this.secretKey       = Keys.hmacShaKeyFor(Decoders.BASE64.decode(secret));
        this.jwtExpirationMs = jwtExpirationMs;
    }

    // ──────────────────────────────────────────────────────────────────────────
    //  Token Generation
    // ──────────────────────────────────────────────────────────────────────────

    /**
     * Generates a signed JWT for the authenticated user.
     *
     * @param authentication Spring Security authentication object
     * @return compact JWT string
     */
    public String generateToken(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        return buildToken(user.getEmail(), user.getId(), user.getRole().name());
    }

    /**
     * Generates a JWT directly from a {@link User} entity (used after registration).
     */
    public String generateTokenFromUser(User user) {
        return buildToken(user.getEmail(), user.getId(), user.getRole().name());
    }

    private String buildToken(String email, Long userId, String role) {
        Date now    = new Date();
        Date expiry = new Date(now.getTime() + jwtExpirationMs);

        return Jwts.builder()
                .subject(email)
                .claim("userId", userId)
                .claim("role", role)
                .issuedAt(now)
                .expiration(expiry)
                .signWith(secretKey)
                .compact();
    }

    // ──────────────────────────────────────────────────────────────────────────
    //  Claims Extraction
    // ──────────────────────────────────────────────────────────────────────────

    public String extractEmail(String token) {
        return parseClaims(token).getSubject();
    }

    public Long extractUserId(String token) {
        return parseClaims(token).get("userId", Long.class);
    }

    public String extractRole(String token) {
        return parseClaims(token).get("role", String.class);
    }

    // ──────────────────────────────────────────────────────────────────────────
    //  Validation
    // ──────────────────────────────────────────────────────────────────────────

    /**
     * Returns {@code true} if the token is cryptographically valid and not expired.
     */
    public boolean validateToken(String token) {
        try {
            parseClaims(token);
            return true;
        } catch (ExpiredJwtException e) {
            log.warn("JWT expired: {}", e.getMessage());
        } catch (UnsupportedJwtException e) {
            log.warn("JWT unsupported: {}", e.getMessage());
        } catch (MalformedJwtException e) {
            log.warn("JWT malformed: {}", e.getMessage());
        } catch (SecurityException e) {
            log.warn("JWT signature invalid: {}", e.getMessage());
        } catch (IllegalArgumentException e) {
            log.warn("JWT claims empty: {}", e.getMessage());
        }
        return false;
    }

    // ──────────────────────────────────────────────────────────────────────────
    //  Internal helpers
    // ──────────────────────────────────────────────────────────────────────────

    private Claims parseClaims(String token) {
        return Jwts.parser()
                .verifyWith(secretKey)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
}
