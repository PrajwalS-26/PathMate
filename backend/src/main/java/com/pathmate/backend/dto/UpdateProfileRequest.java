package com.pathmate.backend.dto;

import com.pathmate.backend.enums.Branch;
import com.pathmate.backend.enums.LearningMode;

import java.math.BigDecimal;

public record UpdateProfileRequest(
        String name,
        Branch branch,
        Integer semester,
        BigDecimal sgpa,
        LearningMode learningMode
) {
}
