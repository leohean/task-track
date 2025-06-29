package com.leo_gui.task_track.task.dto;

import java.time.LocalDateTime;

import com.leo_gui.task_track.task.model.TaskStatus;

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
        Integer createdBy,
        LocalDateTime lastUpdateAt,
        Integer lastUpdateBy
) {
    
}
