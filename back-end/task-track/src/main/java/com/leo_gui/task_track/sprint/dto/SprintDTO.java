package com.leo_gui.task_track.sprint.dto;

import com.leo_gui.task_track.userStory.dto.UserStoryDTO;

import java.util.List;

public record SprintDTO(
        String name,
        String description,
        List<UserStoryDTO> userStoriesDTO
) {
}
