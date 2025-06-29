package com.leo_gui.task_track.project.repository;

import com.leo_gui.task_track.project.model.Project;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProjectRepository extends JpaRepository<Project,Integer> {
    public Page<Project> findAll(Pageable page);
    
    @Query("SELECT p FROM Project p WHERE p.id IN :projectIds")
    Page<Project> findAllByIdIn(@Param("projectIds") List<Integer> projectIds, Pageable page);
}
