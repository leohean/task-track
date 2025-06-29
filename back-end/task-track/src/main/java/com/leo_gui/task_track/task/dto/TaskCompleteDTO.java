package com.leo_gui.task_track.task.dto;

import java.time.LocalDateTime;

import com.leo_gui.task_track.task.model.TaskStatus;
import com.leo_gui.task_track.user.model.User;

public record TaskCompleteDTO(
        Integer id,
        String title,
        String description,
        TaskStatus status,
        Double estimatedTime,
        Double spentTime,
        Integer taskOrder,
        Integer idResponsible,
        LocalDateTime createdAt,
        User createdBy,
        LocalDateTime lastUpdateAt,
        Integer lastUpdateBy
) {
    
}
