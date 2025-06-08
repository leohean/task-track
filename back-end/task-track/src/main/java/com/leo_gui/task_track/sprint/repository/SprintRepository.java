package com.leo_gui.task_track.sprint.repository;

import com.leo_gui.task_track.project.model.Project;
import com.leo_gui.task_track.sprint.model.Sprint;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SprintRepository extends JpaRepository<Sprint, Integer> {
    public Page<Sprint> findAllByProject(Project project, Pageable page);
}
