package com.leo_gui.task_track.userStory.model;

import com.leo_gui.task_track.sprint.model.Sprint;
import com.leo_gui.task_track.task.model.Task;
import com.leo_gui.task_track.user.model.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="user_stories")
@Getter
@Setter
public class UserStory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "id_sprint")
    private Sprint sprint;

    private String title;
    
    private String description;

    @Column(name = "story_order")
    private Integer storyOrder;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @ManyToOne(optional = false)
    @JoinColumn(name = "created_by", nullable = false)
    private User createdBy;

    @Column(name = "last_update_at")
    private LocalDateTime lastUpdateAt;

    @Column(name = "last_update_by")
    private Integer lastUpdateBy;

    @OneToMany(mappedBy = "userStory", cascade = CascadeType.ALL,  orphanRemoval = true)
    private List<Task> tasks = new ArrayList<>();
}
