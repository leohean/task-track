package com.leo_gui.task_track.project.dto;

import com.leo_gui.task_track.user.model.User;

import java.time.LocalDateTime;

public record ProjectDTO(
        String name,
        String description,
        User createdBy,
        User lastUpdateBy
) {
}
