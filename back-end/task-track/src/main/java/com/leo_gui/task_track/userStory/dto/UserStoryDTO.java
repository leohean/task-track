package com.leo_gui.task_track.userStory.dto;

import com.leo_gui.task_track.sprint.model.Sprint;
import com.leo_gui.task_track.task.dto.TaskCompleteDTO;

import com.leo_gui.task_track.user.model.User;
import jakarta.persistence.criteria.CriteriaBuilder.In;

import java.time.LocalDateTime;
import java.util.List;

public record UserStoryDTO(
        Integer id,
        String title,
        String description,
        Integer storyOrder,
        LocalDateTime createdAt,
        User createdBy,
        LocalDateTime lastUpdateAt,
        User lastUpdateBy,
        List<TaskCompleteDTO> tasks
) {
}
