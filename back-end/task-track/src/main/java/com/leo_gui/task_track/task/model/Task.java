package com.leo_gui.task_track.task.model;

import com.leo_gui.task_track.user.model.User;
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

    @ManyToOne(optional = false)
    @JoinColumn(name = "id_responsible", nullable = false)
    private User idResponsible;

    @Enumerated(EnumType.STRING)
    private TaskStatus status;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @ManyToOne(optional = false)
    @JoinColumn(name = "created_by", nullable = false)
    private User createdBy;

    @Column(name = "last_update_at")
    private LocalDateTime lastUpdateAt;

    @ManyToOne(optional = false)
    @JoinColumn(name = "last_update_by", nullable = false)
    private User lastUpdateBy;
}
