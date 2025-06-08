package com.leo_gui.task_track.task.model;

import com.leo_gui.task_track.userStory.model.UserStory;
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
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "id_user_story")
    private UserStory userStory;
    private String title;
    private String description;
    private Double estimatedTime;
    private Double spentTime;
    private Integer taskOrder;
    private Integer idResponsible;
    private LocalDateTime createdAt;
    private Integer createdBy;
    private LocalDateTime lastUpdateAt;
    private Integer lastUpdateBy;
}
