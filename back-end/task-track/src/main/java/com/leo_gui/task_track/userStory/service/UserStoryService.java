package com.leo_gui.task_track.userStory.service;

import com.leo_gui.task_track.sprint.service.SprintService;

import com.leo_gui.task_track.userStory.model.UserStory;
import com.leo_gui.task_track.userStory.repository.UserStoryRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class UserStoryService {
    @Autowired
    private UserStoryRepository userStoryRepository;

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

    public List<UserStory> findAllUserStoriesBySprint(Integer sprintId) {
        return userStoryRepository.findAllBySprintId(sprintId);
    }
}
