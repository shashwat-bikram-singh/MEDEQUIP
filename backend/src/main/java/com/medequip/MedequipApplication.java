package com.medequip;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Slf4j
@SpringBootApplication
public class MedequipApplication {

    public static void main(String[] args) {
        SpringApplication.run(MedequipApplication.class, args);
    }

    /**
     * Creates upload directories on startup if they don't exist.
     */
    @Bean
    CommandLineRunner initUploadDirectories(
            @Value("${app.upload.product-images-dir}") String productImagesDir,
            @Value("${app.upload.profile-images-dir}") String profileImagesDir) {

        return args -> {
            createDirectoryIfNotExists(productImagesDir);
            createDirectoryIfNotExists(profileImagesDir);
        };
    }

    private void createDirectoryIfNotExists(String dirPath) {
        try {
            Path path = Paths.get(dirPath).toAbsolutePath().normalize();
            if (!Files.exists(path)) {
                Files.createDirectories(path);
                log.info("Created upload directory: {}", path);
            }
        } catch (Exception e) {
            log.warn("Could not create directory {}: {}", dirPath, e.getMessage());
        }
    }
}
