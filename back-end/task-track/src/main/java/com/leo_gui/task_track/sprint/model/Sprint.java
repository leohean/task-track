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
    private LocalDateTime createdAt;
    private Integer createdBy;
    private LocalDateTime lastUpdateAt;
    private Integer lastUpdateBy;

    @OneToMany(mappedBy = "sprint", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<UserStory> userStories;
}
