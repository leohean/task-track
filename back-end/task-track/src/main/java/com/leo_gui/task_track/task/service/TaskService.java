package com.leo_gui.task_track.task.service;

import com.leo_gui.task_track.task.model.Task;
import com.leo_gui.task_track.task.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class TaskService {
    @Autowired
    TaskRepository taskRepository;

    public Task createTask(Task task){
        return taskRepository.save(task);
    }

    public Task updateTask(Task task){
        Optional<Task> foundTask = taskRepository.findById(task.getId());
        return foundTask.isPresent() ? taskRepository.save(task) : null;
    }

    public void deleteTaskById(Integer id){
        taskRepository.deleteById(id);
    }
}
