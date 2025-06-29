package com.leo_gui.task_track.userStory.service;

import com.leo_gui.task_track.sprint.dto.SprintDTO;
import com.leo_gui.task_track.sprint.dto.SprintSimpleDTOMapper;
import com.leo_gui.task_track.sprint.model.Sprint;
import com.leo_gui.task_track.sprint.service.SprintService;
import com.leo_gui.task_track.task.model.Task;
import com.leo_gui.task_track.task.service.TaskService;
import com.leo_gui.task_track.userStory.dto.UserStoryDTO;
import com.leo_gui.task_track.userStory.dto.UserStoryDTOMapper;
import com.leo_gui.task_track.userStory.model.UserStory;
import com.leo_gui.task_track.userStory.repository.UserStoryRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    @Autowired
    @Lazy private TaskService taskService;

    @Transactional
    public void createUserStory(Integer sprintId, UserStory userStory) {
        userStory.setCreatedAt(LocalDateTime.now());
        userStory.setLastUpdateAt(LocalDateTime.now());

        Integer storyOrder = userStoryRepository.getMaxStoryOrderBySprintId(sprintId);

        userStory.setStoryOrder(Objects.isNull(storyOrder) ? 1 : storyOrder + 1);

        // Set the sprint for the user story
        userStory.setSprint(sprintService.getSprint(sprintId));
        userStoryRepository.save(userStory);

        // Update the sprint's last update time
        Sprint sprint = userStory.getSprint();
        if (sprint != null) {
            sprint.setLastUpdateAt(LocalDateTime.now());
            sprintService.updateSprint(sprint.getId(), sprint);
        }

        // Update user story tasks
        for (Task task : userStory.getTasks()) { 
            taskService.updateTask(task.getId(), task);
        }
    }

    @Transactional
    public void updateUserStory(Integer id, UserStory userStory) {
        Optional<UserStory> foundUserStory = userStoryRepository.findById(id);
        if (foundUserStory.isPresent()) { 
            UserStory existingUserStory = foundUserStory.get();
            existingUserStory.setTitle(userStory.getTitle());
            existingUserStory.setDescription(userStory.getDescription());
            existingUserStory.setLastUpdateAt(LocalDateTime.now());
            existingUserStory.setStoryOrder(Objects.isNull(userStory.getStoryOrder()) ? 
                existingUserStory.getStoryOrder() : 
                userStory.getStoryOrder()
            );
            userStoryRepository.save(existingUserStory);

            Sprint sprint = userStory.getSprint();
            if (sprint != null) {
                sprint.setLastUpdateAt(LocalDateTime.now());
                sprintService.updateSprint(sprint.getId(), sprint);
            }

            // Update user story tasks
            for (Task task : userStory.getTasks()) { 
                taskService.updateTask(task.getId(), task);
            }
        }
        else {
            throw new IllegalArgumentException("User story with id " + id + " not found.");
        }
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
