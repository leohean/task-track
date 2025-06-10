package com.leo_gui.task_track.user.dto;

import com.leo_gui.task_track.user.model.UserRole;

public record RegisterDTO(
        String name,
        String email,
        String password,
        UserRole role
) {
}
