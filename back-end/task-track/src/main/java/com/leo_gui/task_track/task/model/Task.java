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

    @Enumerated(EnumType.STRING)
    private TaskStatus status;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "created_by")
    private Integer createdBy;

    @Column(name = "last_update_at")
    private LocalDateTime lastUpdateAt;

    @Column(name = "last_update_by")
    private Integer lastUpdateBy;
}
