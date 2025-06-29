package com.leo_gui.task_track.userStory.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.leo_gui.task_track.task.dto.TaskCompleteDTO;
import com.leo_gui.task_track.user.model.User;

public record UserStorySimpleDTO (
    Integer id,
    String title,
    String description,
    Integer storyOrder,
    LocalDateTime createdAt,
    User createdBy,
    LocalDateTime lastUpdateAt,
    Integer lastUpdateBy
) {}
