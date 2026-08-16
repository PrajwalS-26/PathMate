package com.pathmate.backend.config;

import org.springframework.core.convert.converter.Converter;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;

/**
 * Custom JWT Authentication Converter that extracts the user's UUID from the JWT.
 * Supabase stores the user ID in the 'sub' claim of the JWT.
 * This converter creates a JwtAuthenticationToken so controllers can access
 * the user ID using @AuthenticationPrincipal.
 */
public class CustomJwtAuthenticationConverter implements Converter<Jwt, AbstractAuthenticationToken> {

    @Override
    public AbstractAuthenticationToken convert(Jwt jwt) {
        // Extract the user's UUID from the 'sub' claim (Supabase puts the user ID here)
        String userId = jwt.getSubject();
        
        // Return a JwtAuthenticationToken with the JWT and extracted authorities
        // The principal will be the JWT itself, which contains the 'sub' claim
        return new JwtAuthenticationToken(jwt);
    }
}
