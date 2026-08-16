package com.pathmate.backend.dto;

import com.pathmate.backend.enums.Branch;
import com.pathmate.backend.enums.Role;

import java.math.BigDecimal;
import java.util.UUID;

public record ProfileResponse(
        UUID id,
        String name,
        Role role,
        Branch branch,
        Integer semester,
        BigDecimal sgpa,
        Integer currentStreak,
        Integer totalPoints
) {
}
