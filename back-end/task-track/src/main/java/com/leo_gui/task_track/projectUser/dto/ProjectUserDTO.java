package com.leo_gui.task_track.projectUser.dto;

import java.time.LocalDateTime;

public record ProjectUserDTO(
        Integer projectId,
        String projectName,
        Integer userId,
        String userName,
        String userEmail,
        LocalDateTime addedAt
) {
} 