package com.pathmate.backend.controller;

import com.pathmate.backend.dto.ProfileResponse;
import com.pathmate.backend.dto.UpdateProfileRequest;
import com.pathmate.backend.service.ProfileService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/profiles")
public class ProfileController {

    private final ProfileService profileService;

    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @GetMapping("/{userId}")
    public ResponseEntity<ProfileResponse> getProfile(@PathVariable UUID userId) {
        ProfileResponse response = profileService.getProfile(userId);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{userId}")
    public ResponseEntity<ProfileResponse> updateProfile(
            @PathVariable UUID userId,
            @RequestBody UpdateProfileRequest request) {
        ProfileResponse response = profileService.updateProfile(userId, request);
        return ResponseEntity.ok(response);
    }
}
