package com.leo_gui.task_track.userStory.repository;

import com.leo_gui.task_track.project.model.Project;
import com.leo_gui.task_track.sprint.model.Sprint;
import com.leo_gui.task_track.userStory.model.UserStory;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserStoryRepository extends JpaRepository<UserStory, Integer> {
    public Page<UserStory> findAllBySprint(Sprint sprint, Pageable page);

    @Query("SELECT MAX(us.storyOrder) FROM UserStory us WHERE us.sprint.id = :sprintId")
    Integer getMaxStoryOrderBySprintId(Integer sprintId);
}
