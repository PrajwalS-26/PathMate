package com.pathmate.backend.repository;

import com.pathmate.backend.entity.RoadmapTrack;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface RoadmapTrackRepository extends JpaRepository<RoadmapTrack, UUID> {
}
