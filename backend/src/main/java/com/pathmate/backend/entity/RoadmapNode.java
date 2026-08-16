package com.pathmate.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Table(name = "roadmap_nodes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RoadmapNode {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(columnDefinition = "uuid")
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "track_id", nullable = false)
    private RoadmapTrack track;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "text")
    private String description;

    @Column(name = "node_order", nullable = false)
    private Integer nodeOrder;

    @Column(name = "estimated_hours")
    private Integer estimatedHours;

    @Column(columnDefinition = "jsonb")
    private String resources;

    @Column(name = "leetcode_url")
    private String leetcodeUrl;
}
