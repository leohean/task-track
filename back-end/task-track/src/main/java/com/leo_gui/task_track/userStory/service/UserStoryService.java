package com.leo_gui.task_track.userStory.service;

import com.leo_gui.task_track.userStory.model.UserStory;
import com.leo_gui.task_track.userStory.repository.UserStoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserStoryService {
    @Autowired
    private UserStoryRepository userStoryRepository;

    public UserStory createUserStory(UserStory userStory) {
        return userStoryRepository.save(userStory);
    }

    public UserStory updateUserStory(UserStory userStory) {
        Optional<UserStory> foundUserStory = userStoryRepository.findById(userStory.getId());
        return foundUserStory.isPresent() ? userStoryRepository.save(userStory) : null;
    }

    public void deleteUserStoryById(Integer id) {
        userStoryRepository.deleteById(id);
    }
}
