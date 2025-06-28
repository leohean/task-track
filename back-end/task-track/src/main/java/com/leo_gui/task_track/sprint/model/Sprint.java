package com.leo_gui.task_track.sprint.model;

import com.leo_gui.task_track.project.model.Project;
import com.leo_gui.task_track.userStory.model.UserStory;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name="sprints")
@Getter
@Setter
public class Sprint {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "id_project")
    private Project project;

    private String name;
    private String description;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "created_by")
    private Integer createdBy;

    @Column(name = "last_update_at")
    private LocalDateTime lastUpdateAt;

    @Column(name = "last_update_by")
    private Integer lastUpdateBy;

    @OneToMany(mappedBy = "sprint", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<UserStory> userStories;
}
