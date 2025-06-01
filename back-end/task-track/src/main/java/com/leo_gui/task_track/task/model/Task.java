package com.leo_gui.task_track.task.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name="tasks")
@Getter
@Setter
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private int idUserStory;
    private String title;
    private String description;
    private Double estimatedTime;
    private Double spentTime;
    private int taskOrder;
    private int idResponsible;
    private LocalDateTime createdAt;
    private int createdBy;
    private LocalDateTime lastUpdateAt;
    private int lastUpdateBy;
}
