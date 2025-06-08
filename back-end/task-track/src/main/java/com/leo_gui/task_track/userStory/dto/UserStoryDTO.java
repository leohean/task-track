package com.leo_gui.task_track.userStory.dto;

import com.leo_gui.task_track.sprint.model.Sprint;
import com.leo_gui.task_track.task.dto.TaskDTO;

import java.util.List;

public record UserStoryDTO(
        String title,
        String description,
        List<TaskDTO> tasksDTO
) {
}
