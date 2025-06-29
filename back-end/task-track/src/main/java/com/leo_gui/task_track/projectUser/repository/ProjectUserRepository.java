package com.leo_gui.task_track.projectUser.repository;

import com.leo_gui.task_track.project.model.Project;
import com.leo_gui.task_track.projectUser.model.ProjectUser;
import com.leo_gui.task_track.projectUser.model.ProjectUserId;
import com.leo_gui.task_track.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProjectUserRepository extends JpaRepository<ProjectUser, ProjectUserId> {
    
    List<ProjectUser> findByProject(Project project);
    
    List<ProjectUser> findByUser(User user);
    
    @Query("SELECT pu FROM ProjectUser pu WHERE pu.project.id = :projectId")
    List<ProjectUser> findByProjectId(@Param("projectId") Integer projectId);
    
    @Query("SELECT pu FROM ProjectUser pu WHERE pu.user.id = :userId")
    List<ProjectUser> findByUserId(@Param("userId") Integer userId);
    
    @Query("SELECT pu FROM ProjectUser pu WHERE pu.project.id = :projectId AND pu.user.id = :userId")
    Optional<ProjectUser> findByProjectIdAndUserId(@Param("projectId") Integer projectId, @Param("userId") Integer userId);
    
    boolean existsByProjectIdAndUserId(Integer projectId, Integer userId);
    
    @Query("SELECT COUNT(pu) FROM ProjectUser pu WHERE pu.project.id = :projectId")
    long countByProjectId(@Param("projectId") Integer projectId);
} 