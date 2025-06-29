package com.leo_gui.task_track.task.service;

import com.leo_gui.task_track.task.model.Task;
import com.leo_gui.task_track.task.model.TaskStatus;
import com.leo_gui.task_track.task.repository.TaskRepository;
import com.leo_gui.task_track.user.model.User;
import com.leo_gui.task_track.userStory.model.UserStory;
import com.leo_gui.task_track.userStory.service.UserStoryService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class TaskService {
    @Autowired
    TaskRepository taskRepository;

    @Autowired
    UserStoryService userStoryService;

    public Task createTask(Integer userStoryId, Task task){

        UserStory us = userStoryService.getUserStory(userStoryId);

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = (User)authentication.getPrincipal();

        task.setUserStory(us);
        task.setCreatedAt(LocalDateTime.now());
        task.setCreatedBy(user);
        task.setLastUpdateAt(LocalDateTime.now());
        task.setLastUpdateBy(user);

        return taskRepository.save(task);
    }

    public void updateTask(Integer id, Task task){
        Optional<Task> foundTask = taskRepository.findById(id);

        if (foundTask.isPresent()) {
            Task existingTask = foundTask.get();
            existingTask.setTitle(task.getTitle());
            existingTask.setDescription(task.getDescription());
            existingTask.setStatus(task.getStatus());
            existingTask.setTaskOrder(task.getTaskOrder());
            existingTask.setLastUpdateAt(LocalDateTime.now());
            existingTask.setSpentTime(task.getSpentTime());
            existingTask.setEstimatedTime(task.getEstimatedTime());
            taskRepository.save(existingTask);
        }
    }

    public void deleteTaskById(Integer id){
        taskRepository.deleteById(id);
    }
}
