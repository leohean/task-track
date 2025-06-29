package com.leo_gui.task_track.projectUser.dto;

import com.leo_gui.task_track.projectUser.model.ProjectUser;
import org.springframework.stereotype.Component;

import java.util.function.Function;

@Component
public class ProjectUserDTOMapper implements Function<ProjectUser, ProjectUserDTO> {
    
    @Override
    public ProjectUserDTO apply(ProjectUser projectUser) {
        return new ProjectUserDTO(
                projectUser.getProject().getId(),
                projectUser.getProject().getName(),
                projectUser.getUser().getId(),
                projectUser.getUser().getName(),
                projectUser.getUser().getEmail(),
                projectUser.getAddedAt()
        );
    }
} 