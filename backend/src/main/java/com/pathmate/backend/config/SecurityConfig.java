package com.pathmate.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.web.SecurityFilterChain;

/**
 * Security configuration for PathMate backend.
 * Configures Spring Security to validate Supabase JWTs and secure API endpoints.
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            // Disable CSRF since we're using JWTs and a React frontend
            .csrf(csrf -> csrf.disable())
            // Configure authorization rules
            .authorizeHttpRequests(auth -> auth
                // Permit all requests to /api/auth/** (for future auth endpoints)
                .requestMatchers("/api/auth/**").permitAll()
                // Require authentication for all other /api/** endpoints
                .requestMatchers("/api/**").authenticated()
                // Allow access to any other endpoints (e.g., actuator, health checks)
                .anyRequest().permitAll()
            )
            // Configure OAuth2 Resource Server with JWT
            .oauth2ResourceServer(oauth2 -> oauth2
                .jwt(jwt -> jwt
                    .jwtAuthenticationConverter(customJwtAuthenticationConverter())
                )
            );

        return http.build();
    }

    @Bean
    public JwtAuthenticationConverter customJwtAuthenticationConverter() {
        CustomJwtAuthenticationConverter converter = new CustomJwtAuthenticationConverter();
        return converter;
    }
}
