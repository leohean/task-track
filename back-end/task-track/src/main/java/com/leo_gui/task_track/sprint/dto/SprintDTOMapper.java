package com.leo_gui.task_track.sprint.dto;

import com.leo_gui.task_track.sprint.model.Sprint;
import com.leo_gui.task_track.task.dto.TaskDTO;
import com.leo_gui.task_track.userStory.dto.UserStoryDTO;
import org.springframework.stereotype.Service;

import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class SprintDTOMapper implements Function<Sprint, SprintDTO> {
    public SprintDTO apply(Sprint sprint) {
        return new SprintDTO(sprint.getName(),
                sprint.getDescription(),
                sprint.getCreatedAt(),
                sprint.getCreatedBy(),
                sprint.getLastUpdateAt(),
                sprint.getLastUpdateBy(),
                sprint.getUserStories().stream().map(
                        us -> new UserStoryDTO(us.getTitle(), us.getDescription(),
                                    us.getTasks().stream().map(
                                            t -> new TaskDTO(t.getTitle()))
                                            .collect(Collectors.toList())))
                .collect(Collectors.toList())
                );
    }
}
