package com.leo_gui.task_track.projectUser.model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProjectUserId implements Serializable {
    
    @Column(name = "project_id")
    private Integer projectId;
    
    @Column(name = "user_id")
    private Integer userId;
    
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ProjectUserId that = (ProjectUserId) o;
        return Objects.equals(projectId, that.projectId) && Objects.equals(userId, that.userId);
    }
    
    @Override
    public int hashCode() {
        return Objects.hash(projectId, userId);
    }
} 