package com.leo_gui.task_track.task.repository;

import com.leo_gui.task_track.task.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Integer> {
}
