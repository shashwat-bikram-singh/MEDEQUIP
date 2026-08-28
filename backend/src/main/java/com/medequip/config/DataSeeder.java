package com.medequip.config;

import com.medequip.entity.*;
import com.medequip.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final CartRepository cartRepository;
    private final PasswordEncoder passwordEncoder;

    @org.springframework.beans.factory.annotation.Value("${app.seed.enabled:true}")
    private boolean seedEnabled;

    @Override
    public void run(String... args) throws Exception {
        if (seedEnabled && categoryRepository.count() == 0) {
            seedData();
        }
    }

    private void seedData() {
        // Categories
        Category surgical = categoryRepository.save(Category.builder().name("Surgical Equipment").description("Surgical tools").build());
        Category diagnostic = categoryRepository.save(Category.builder().name("Diagnostic Devices").description("Diagnostic devices").build());
        Category furniture = categoryRepository.save(Category.builder().name("Hospital Furniture").description("Hospital furniture").build());
        Category patient = categoryRepository.save(Category.builder().name("Patient Care").description("Patient care").build());
        Category lab = categoryRepository.save(Category.builder().name("Lab Equipment").description("Lab equipment").build());
        Category emergency = categoryRepository.save(Category.builder().name("Emergency Equipment").description("Emergency equipment").build());
        Category rehab = categoryRepository.save(Category.builder().name("Rehabilitation").description("Rehab equipment").build());
        Category ppe = categoryRepository.save(Category.builder().name("PPE & Safety").description("PPE & Safety").build());

        // Products
        productRepository.saveAll(List.of(
                Product.builder().name("Scalpel Set").description("High quality scalpel set").price(new BigDecimal("50.00")).stock(100).category(surgical).brand("SurgiCorp").build(),
                Product.builder().name("Forceps").description("Stainless steel forceps").price(new BigDecimal("15.00")).stock(50).category(surgical).brand("SurgiCorp").build(),

                Product.builder().name("Blood Pressure Monitor").description("Digital BP monitor").price(new BigDecimal("75.00")).stock(30).category(diagnostic).brand("HealthTech").build(),
                Product.builder().name("Stethoscope").description("Premium stethoscope").price(new BigDecimal("120.00")).stock(40).category(diagnostic).brand("HeartBeat").build(),

                Product.builder().name("Hospital Bed").description("Adjustable hospital bed").price(new BigDecimal("1200.00")).stock(10).category(furniture).brand("ComfortCare").build(),
                Product.builder().name("Overbed Table").description("Convenient overbed table").price(new BigDecimal("150.00")).stock(20).category(furniture).brand("ComfortCare").build(),

                Product.builder().name("Wheelchair").description("Standard wheelchair").price(new BigDecimal("300.00")).stock(15).category(patient).brand("MobilityPlus").build(),
                Product.builder().name("Walker").description("Folding walker").price(new BigDecimal("80.00")).stock(25).category(patient).brand("MobilityPlus").build(),

                Product.builder().name("Microscope").description("Lab microscope").price(new BigDecimal("800.00")).stock(5).category(lab).brand("LabTech").build(),
                Product.builder().name("Centrifuge").description("Digital centrifuge").price(new BigDecimal("450.00")).stock(8).category(lab).brand("LabTech").build(),

                Product.builder().name("Defibrillator").description("AED Defibrillator").price(new BigDecimal("1500.00")).stock(3).category(emergency).brand("LifeSave").build(),
                Product.builder().name("First Aid Kit").description("Comprehensive first aid kit").price(new BigDecimal("45.00")).stock(100).category(emergency).brand("LifeSave").build(),

                Product.builder().name("Knee Brace").description("Supportive knee brace").price(new BigDecimal("35.00")).stock(60).category(rehab).brand("RehabPro").build(),
                Product.builder().name("Therapy Bands").description("Resistance bands set").price(new BigDecimal("25.00")).stock(80).category(rehab).brand("RehabPro").build(),

                Product.builder().name("N95 Masks (Pack of 50)").description("N95 Respirator Masks").price(new BigDecimal("60.00")).stock(200).category(ppe).brand("SafeShield").build(),
                Product.builder().name("Surgical Gloves (Box of 100)").description("Nitrile surgical gloves").price(new BigDecimal("20.00")).stock(300).category(ppe).brand("SafeShield").build()
        ));

        // Admin User
        User admin = User.builder()
                .firstName("Admin")
                .lastName("User")
                .email("admin@medequip.com")
                .password(passwordEncoder.encode("Admin123!"))
                .role(Role.ADMIN)
                .build();
        userRepository.save(admin);

        // Cart
        cartRepository.save(Cart.builder().user(admin).build());
    }
}
