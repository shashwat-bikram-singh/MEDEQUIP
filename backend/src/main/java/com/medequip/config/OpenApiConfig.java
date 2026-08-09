package com.medequip.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Springdoc / Swagger UI configuration.
 *
 * <p>Adds Bearer token authentication so you can test protected endpoints
 * directly from the Swagger UI at {@code /swagger-ui.html}.</p>
 */
@Configuration
public class OpenApiConfig {

    private static final String SECURITY_SCHEME_NAME = "bearerAuth";

    @Bean
    public OpenAPI medequipOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("MEDEQUIP REST API")
                        .description("Aidoxy Healthcare — Medical Equipment E-Commerce Backend")
                        .version("1.0.0")
                        .contact(new Contact()
                                .name("Aidoxy Healthcare Pvt. Ltd.")
                                .email("info@aidoxyhealthcare.com")))
                .addSecurityItem(new SecurityRequirement().addList(SECURITY_SCHEME_NAME))
                .components(new Components()
                        .addSecuritySchemes(SECURITY_SCHEME_NAME, new SecurityScheme()
                                .name(SECURITY_SCHEME_NAME)
                                .type(SecurityScheme.Type.HTTP)
                                .scheme("bearer")
                                .bearerFormat("JWT")));
    }
}
