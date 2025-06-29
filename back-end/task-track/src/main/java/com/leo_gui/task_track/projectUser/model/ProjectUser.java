package com.leo_gui.task_track.projectUser.model;

import com.leo_gui.task_track.project.model.Project;
import com.leo_gui.task_track.user.model.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name="project_user")
@Getter
@Setter
public class ProjectUser {
    
    @EmbeddedId
    private ProjectUserId id;
    
    @ManyToOne
    @MapsId("projectId")
    @JoinColumn(name = "project_id")
    private Project project;
    
    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    private User user;
    
    @Column(name = "added_at")
    private LocalDateTime addedAt;
    
    public ProjectUser() {}
    
    public ProjectUser(Project project, User user) {
        this.id = new ProjectUserId(project.getId(), user.getId());
        this.project = project;
        this.user = user;
        this.addedAt = LocalDateTime.now();
    }
}
