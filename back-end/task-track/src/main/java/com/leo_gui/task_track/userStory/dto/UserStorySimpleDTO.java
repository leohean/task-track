package com.leo_gui.task_track.userStory.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.leo_gui.task_track.task.dto.TaskCompleteDTO;

public record UserStorySimpleDTO (
    Integer id,
    String title,
    String description,
    Integer storyOrder,
    LocalDateTime createdAt,
    Integer createdBy,
    LocalDateTime lastUpdateAt,
    Integer lastUpdateBy
) {}
