package com.medequip.controller;

import com.medequip.dto.request.ProductRequest;
import com.medequip.dto.response.ApiResponse;
import com.medequip.dto.response.ProductResponse;
import com.medequip.entity.Product;
import com.medequip.exception.ResourceNotFoundException;
import com.medequip.repository.ProductRepository;
import com.medequip.service.FileStorageService;
import com.medequip.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
@Tag(name = "Products", description = "Product catalog endpoints")
public class ProductController {

    private final ProductService productService;
    private final FileStorageService fileStorageService;
    private final ProductRepository productRepository;

    @GetMapping
    @Operation(summary = "List all products (paginated, with optional filters)")
    public ResponseEntity<Page<ProductResponse>> getAllProducts(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long categoryId,
            @RequestParam(required = false) String brand,
            @PageableDefault(size = 12, sort = "createdAt") Pageable pageable) {
        return ResponseEntity.ok(productService.getAllProducts(keyword, categoryId, brand, pageable));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get a single product by ID")
    public ResponseEntity<ProductResponse> getProductById(@PathVariable Long id) {
        return ResponseEntity.ok(productService.getProductById(id));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Create a new product (ADMIN only)")
    public ResponseEntity<ProductResponse> createProduct(@Valid @RequestBody ProductRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(productService.createProduct(request));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Update an existing product (ADMIN only)")
    public ResponseEntity<ProductResponse> updateProduct(
            @PathVariable Long id,
            @Valid @RequestBody ProductRequest request) {
        return ResponseEntity.ok(productService.updateProduct(id, request));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Delete a product (ADMIN only)")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/image")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Upload a product image (ADMIN only)")
    public ResponseEntity<ApiResponse<ProductResponse>> uploadProductImage(
            @PathVariable Long id,
            @RequestParam("file") MultipartFile file) {

        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product", id));

        // Delete old image if exists
        if (product.getImage() != null) {
            fileStorageService.deleteProductImage(product.getImage());
        }

        String filename = fileStorageService.storeProductImage(file);
        product.setImage(filename);
        productRepository.save(product);

        return ResponseEntity.ok(ApiResponse.success(
                "Image uploaded successfully",
                productService.getProductById(id)));
    }
}
