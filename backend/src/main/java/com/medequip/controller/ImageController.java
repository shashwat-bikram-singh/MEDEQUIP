package com.medequip.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

/**
 * Serves uploaded images (products, profiles) as static resources.
 *
 * <p>The mappers build image URLs like
 * {@code http://localhost:8080/api/images/products/{filename}},
 * and SecurityConfig permits {@code /api/images/**} without authentication.</p>
 */
@Slf4j
@RestController
@RequestMapping("/api/images")
@Tag(name = "Images", description = "Serve uploaded image files")
public class ImageController {

    private final Path productImagesDir;
    private final Path profileImagesDir;

    public ImageController(
            @Value("${app.upload.product-images-dir}") String productImagesPath,
            @Value("${app.upload.profile-images-dir}") String profileImagesPath) {
        this.productImagesDir = Paths.get(productImagesPath).toAbsolutePath().normalize();
        this.profileImagesDir = Paths.get(profileImagesPath).toAbsolutePath().normalize();
    }

    @GetMapping("/products/{filename:.+}")
    @Operation(summary = "Get a product image by filename")
    public ResponseEntity<Resource> getProductImage(@PathVariable String filename) {
        return serveFile(productImagesDir, filename);
    }

    @GetMapping("/profiles/{filename:.+}")
    @Operation(summary = "Get a profile image by filename")
    public ResponseEntity<Resource> getProfileImage(@PathVariable String filename) {
        return serveFile(profileImagesDir, filename);
    }

    // ── Internal ─────────────────────────────────────────────────────────────

    private ResponseEntity<Resource> serveFile(Path directory, String filename) {
        try {
            Path filePath = directory.resolve(filename).normalize();

            // Security: ensure the resolved path is still within the target directory
            if (!filePath.startsWith(directory)) {
                return ResponseEntity.badRequest().build();
            }

            Resource resource = new UrlResource(filePath.toUri());

            if (!resource.exists() || !resource.isReadable()) {
                return ResponseEntity.notFound().build();
            }

            // Detect content type
            String contentType = Files.probeContentType(filePath);
            if (contentType == null) {
                contentType = "application/octet-stream";
            }

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    .header(HttpHeaders.CACHE_CONTROL, "max-age=86400")
                    .body(resource);

        } catch (MalformedURLException e) {
            log.error("Malformed URL for file {}: {}", filename, e.getMessage());
            return ResponseEntity.badRequest().build();
        } catch (Exception e) {
            log.error("Error serving file {}: {}", filename, e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }
}
