package com.leo_gui.task_track.sprint.dto;

import com.leo_gui.task_track.user.model.User;
import com.leo_gui.task_track.userStory.dto.UserStoryDTO;

import jakarta.persistence.Column;

import java.time.LocalDateTime;
import java.util.List;

public record SprintDTO(
        Integer id,
        String name,
        String description,
        LocalDateTime createdAt,
        User createdBy,
        LocalDateTime lastUpdateAt,
        User lastUpdateBy,
        List<UserStoryDTO> userStoriesDTO
) {
}
