package com.leo_gui.task_track.sprint.dto;

import com.leo_gui.task_track.sprint.model.Sprint;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class SprintSimpleDTOMapper implements Function<Sprint, SprintDTO> {
    public SprintDTO apply(Sprint sprint) {
        return new SprintDTO(
            sprint.getName(), 
            sprint.getDescription(), 
            sprint.getCreatedAt(), 
            sprint.getCreatedBy(),
            sprint.getLastUpdateAt(), 
            sprint.getLastUpdateBy(),
            null);
    }
}
