package com.leo_gui.task_track.sprint.dto;

import com.leo_gui.task_track.userStory.dto.UserStoryDTO;

import jakarta.persistence.Column;

import java.time.LocalDateTime;
import java.util.List;

public record SprintDTO(
        Integer id,
        String name,
        String description,
        LocalDateTime createdAt,
        Integer createdBy,
        LocalDateTime lastUpdateAt,
        Integer lastUpdateBy,
        List<UserStoryDTO> userStoriesDTO
) {
}
