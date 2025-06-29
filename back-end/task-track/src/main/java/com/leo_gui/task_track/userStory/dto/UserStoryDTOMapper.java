package com.leo_gui.task_track.userStory.dto;

import com.leo_gui.task_track.sprint.dto.SprintDTO;
import com.leo_gui.task_track.sprint.model.Sprint;
import com.leo_gui.task_track.task.dto.TaskCompleteDTO;
import com.leo_gui.task_track.userStory.model.UserStory;
import org.springframework.stereotype.Service;

import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class UserStoryDTOMapper implements Function<UserStory, UserStoryDTO> {
    public UserStoryDTO apply(UserStory userStory) {
        return new UserStoryDTO(
            userStory.getId(),
            userStory.getTitle(),
            userStory.getDescription(),
            userStory.getStoryOrder(),
            userStory.getCreatedAt(),
            userStory.getCreatedBy(),
            userStory.getLastUpdateAt(),
            userStory.getLastUpdateBy(),
            userStory.getTasks().stream()
                .map(task -> new TaskCompleteDTO(
                    task.getId(),
                    task.getTitle(),
                    task.getDescription(),
                    task.getStatus(),
                    task.getEstimatedTime(),
                    task.getSpentTime(),
                    task.getTaskOrder(),
                    task.getResponsible(),
                    task.getCreatedAt(),
                    task.getCreatedBy(),
                    task.getLastUpdateAt(),
                    task.getLastUpdateBy()))
                .collect(Collectors.toList())
        );
    }
}
