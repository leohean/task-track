package com.leo_gui.task_track.userStory.service;

import com.leo_gui.task_track.sprint.dto.SprintDTO;
import com.leo_gui.task_track.sprint.dto.SprintSimpleDTOMapper;
import com.leo_gui.task_track.sprint.model.Sprint;
import com.leo_gui.task_track.sprint.service.SprintService;

import com.leo_gui.task_track.userStory.dto.UserStoryDTO;
import com.leo_gui.task_track.userStory.dto.UserStoryDTOMapper;
import com.leo_gui.task_track.userStory.model.UserStory;
import com.leo_gui.task_track.userStory.repository.UserStoryRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Objects;
import java.util.Optional;

@Service
public class UserStoryService {
    @Autowired
    private UserStoryRepository userStoryRepository;

    @Autowired
    private UserStoryDTOMapper userStoryDTOMapper;

    @Autowired
    private SprintService sprintService;

    public UserStory createUserStory(Integer sprintId, UserStory userStory) {
        userStory.setCreatedAt(LocalDateTime.now());
        userStory.setLastUpdateAt(LocalDateTime.now());

        Integer storyOrder = userStoryRepository.getMaxStoryOrderBySprintId(sprintId);

        userStory.setStoryOrder(Objects.isNull(storyOrder) ? 1 : storyOrder + 1);

        // Set the sprint for the user story
        userStory.setSprint(sprintService.getSprint(sprintId));
        return userStoryRepository.save(userStory);
    }

    public UserStory updateUserStory(Integer id, UserStory userStory) {
        Optional<UserStory> foundUserStory = userStoryRepository.findById(id);
        return foundUserStory.isPresent() ? userStoryRepository.save(userStory) : null;
    }

    public void deleteUserStoryById(Integer id) {
        userStoryRepository.deleteById(id);
    }

    public Page<UserStoryDTO> findAllUserStoriesBySprint(Sprint sprint, Pageable page) {
        return userStoryRepository.findAllBySprint(sprint, page).map(userStoryDTOMapper);
    }

    public UserStory getUserStory(Integer id) {
        Optional<UserStory> foundUserStory = userStoryRepository.findById(id);
        return foundUserStory.orElse(null);
    }
}
