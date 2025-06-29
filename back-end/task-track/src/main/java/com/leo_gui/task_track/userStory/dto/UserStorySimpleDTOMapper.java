package com.leo_gui.task_track.userStory.dto;

import com.leo_gui.task_track.sprint.dto.SprintDTO;
import com.leo_gui.task_track.sprint.model.Sprint;
import com.leo_gui.task_track.userStory.model.UserStory;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class UserStorySimpleDTOMapper implements Function<UserStory, UserStoryDTO> {
    public UserStoryDTO apply(UserStory userStory) {
        return new UserStoryDTO(
                userStory.getTitle(),
                userStory.getDescription(),
                null);
    }
}
