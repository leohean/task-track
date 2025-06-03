package com.leo_gui.task_track.project.repository;

import com.leo_gui.task_track.project.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<Project,Integer> {
}
