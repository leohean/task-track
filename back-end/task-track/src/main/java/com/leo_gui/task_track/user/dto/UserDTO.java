package com.leo_gui.task_track.user.dto;

import com.leo_gui.task_track.user.model.UserRole;

public record UserDTO(
    Integer id,
    String name,
    String email,
    UserRole role
) {
    
}
