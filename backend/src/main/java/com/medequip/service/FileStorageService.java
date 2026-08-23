package com.medequip.service;

import com.medequip.exception.BadRequestException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Set;
import java.util.UUID;

/**
 * Handles saving and deleting uploaded files (product images, profile pictures)
 * on the local filesystem.
 */
@Slf4j
@Service
public class FileStorageService {

    private static final Set<String> ALLOWED_CONTENT_TYPES = Set.of(
            "image/jpeg", "image/png", "image/gif", "image/webp"
    );

    private final Path productImagesDir;
    private final Path profileImagesDir;

    public FileStorageService(
            @Value("${app.upload.product-images-dir}") String productImagesPath,
            @Value("${app.upload.profile-images-dir}") String profileImagesPath) {

        this.productImagesDir = Paths.get(productImagesPath).toAbsolutePath().normalize();
        this.profileImagesDir = Paths.get(profileImagesPath).toAbsolutePath().normalize();
    }

    /**
     * Stores a product image and returns the generated filename.
     */
    public String storeProductImage(MultipartFile file) {
        return store(file, productImagesDir);
    }

    /**
     * Stores a profile image and returns the generated filename.
     */
    public String storeProfileImage(MultipartFile file) {
        return store(file, profileImagesDir);
    }

    /**
     * Deletes a product image by filename (best-effort, logs errors).
     */
    public void deleteProductImage(String filename) {
        delete(filename, productImagesDir);
    }

    /**
     * Deletes a profile image by filename (best-effort, logs errors).
     */
    public void deleteProfileImage(String filename) {
        delete(filename, profileImagesDir);
    }

    // ── Internal ─────────────────────────────────────────────────────────────

    private String store(MultipartFile file, Path targetDir) {
        if (file == null || file.isEmpty()) {
            throw new BadRequestException("File is empty or missing");
        }

        String contentType = file.getContentType();
        if (contentType == null || !ALLOWED_CONTENT_TYPES.contains(contentType)) {
            throw new BadRequestException(
                    "Invalid file type. Allowed types: JPEG, PNG, GIF, WebP");
        }

        String originalFilename = StringUtils.cleanPath(
                file.getOriginalFilename() != null ? file.getOriginalFilename() : "image");

        // Prevent path traversal
        if (originalFilename.contains("..")) {
            throw new BadRequestException("Filename contains invalid path sequence: " + originalFilename);
        }

        // Generate unique filename to avoid collisions
        String extension = getExtension(originalFilename);
        String storedFilename = UUID.randomUUID() + extension;

        try {
            Files.createDirectories(targetDir);
            Path targetPath = targetDir.resolve(storedFilename);
            Files.copy(file.getInputStream(), targetPath, StandardCopyOption.REPLACE_EXISTING);
            log.info("Stored file: {}", targetPath);
            return storedFilename;
        } catch (IOException e) {
            throw new BadRequestException("Failed to store file: " + e.getMessage());
        }
    }

    private void delete(String filename, Path targetDir) {
        if (filename == null || filename.isBlank()) return;
        try {
            Path filePath = targetDir.resolve(filename).normalize();
            Files.deleteIfExists(filePath);
            log.info("Deleted file: {}", filePath);
        } catch (IOException e) {
            log.error("Failed to delete file {}: {}", filename, e.getMessage());
        }
    }

    private String getExtension(String filename) {
        int dotIndex = filename.lastIndexOf('.');
        return (dotIndex >= 0) ? filename.substring(dotIndex) : ".jpg";
    }
}
