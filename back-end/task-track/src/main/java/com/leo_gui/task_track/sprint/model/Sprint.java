package com.leo_gui.task_track.sprint.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name="sprints")
@Getter
@Setter
public class Sprint {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int id;
    private int idProject;
    private String name;
    private String description;
    private LocalDateTime createdAt;
    private int createdBy;
    private LocalDateTime last_update_at;
    private int lastUpdateBy;
}
