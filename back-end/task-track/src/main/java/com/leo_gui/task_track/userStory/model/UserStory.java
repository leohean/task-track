package com.leo_gui.task_track.userStory.model;

import com.leo_gui.task_track.sprint.model.Sprint;
import com.leo_gui.task_track.task.model.Task;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
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
    private Integer storyOrder;
    private LocalDateTime created_at;
    private Integer integer;
    private LocalDateTime date;
    private Integer lastUpdateBy;

    @OneToMany(mappedBy = "userStory", cascade = CascadeType.ALL,  orphanRemoval = true)
    private List<Task> tasks;
}
