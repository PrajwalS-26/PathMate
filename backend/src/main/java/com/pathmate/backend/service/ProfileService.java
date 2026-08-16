package com.pathmate.backend.service;

import com.pathmate.backend.dto.ProfileResponse;
import com.pathmate.backend.dto.UpdateProfileRequest;
import com.pathmate.backend.entity.Profile;
import com.pathmate.backend.exception.ResourceNotFoundException;
import com.pathmate.backend.repository.ProfileRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@Transactional
public class ProfileService {

    private final ProfileRepository profileRepository;

    public ProfileService(ProfileRepository profileRepository) {
        this.profileRepository = profileRepository;
    }

    @Transactional(readOnly = true)
    public ProfileResponse getProfile(UUID userId) {
        Profile profile = profileRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Profile not found for user ID: " + userId));
        
        return mapToResponse(profile);
    }

    public ProfileResponse updateProfile(UUID userId, UpdateProfileRequest request) {
        Profile profile = profileRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Profile not found for user ID: " + userId));
        
        // Update fields
        if (request.name() != null) {
            profile.setName(request.name());
        }
        if (request.branch() != null) {
            profile.setBranch(request.branch());
        }
        if (request.semester() != null) {
            profile.setSemester(request.semester());
        }
        if (request.sgpa() != null) {
            profile.setSgpa(request.sgpa());
        }
        if (request.learningMode() != null) {
            profile.setLearningMode(request.learningMode());
        }
        
        Profile updatedProfile = profileRepository.save(profile);
        return mapToResponse(updatedProfile);
    }

    private ProfileResponse mapToResponse(Profile profile) {
        return new ProfileResponse(
                profile.getId(),
                profile.getName(),
                profile.getRole(),
                profile.getBranch(),
                profile.getSemester(),
                profile.getSgpa(),
                profile.getCurrentStreak(),
                profile.getTotalPoints()
        );
    }
}
