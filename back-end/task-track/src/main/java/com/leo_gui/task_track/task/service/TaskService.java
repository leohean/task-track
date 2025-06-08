package com.leo_gui.task_track.task.service;

import com.leo_gui.task_track.task.model.Task;
import com.leo_gui.task_track.task.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TaskService {
    @Autowired
    TaskRepository taskRepository;

    public Task createTask(Task task){
        return taskRepository.save(task);
    }

    public void deleteTaskById(Integer id){
        taskRepository.deleteById(id);
    }
}
