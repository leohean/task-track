package com.leo_gui.task_track.userStory.dto;

import com.leo_gui.task_track.sprint.model.Sprint;
import com.leo_gui.task_track.task.dto.TaskCompleteDTO;
import com.leo_gui.task_track.task.dto.TaskDTO;

import jakarta.persistence.criteria.CriteriaBuilder.In;

import java.time.LocalDateTime;
import java.util.List;

public record UserStoryDTO(
        Integer id,
        String title,
        String description,
        Integer storyOrder,
        LocalDateTime createdAt,
        Integer createdBy,
        LocalDateTime lastUpdateAt,
        Integer lastUpdateBy,
        List<TaskCompleteDTO> tasks
) {
}
