package com.leo_gui.task_track.projectUser.dto;

import java.util.List;

public record AddUsersToProjectDTO(
        List<Integer> userIds
) {
} 