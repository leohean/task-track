package com.leo_gui.task_track.userStory.repository;

import com.leo_gui.task_track.userStory.model.UserStory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserStoryRepository extends JpaRepository<UserStory, Integer> {

    Page<UserStory> findAllBySprintId(Integer sprintId, Pageable page);

    @Query("SELECT MAX(us.storyOrder) FROM UserStory us WHERE us.sprint.id = :sprintId")
    Integer getMaxStoryOrderBySprintId(Integer sprintId);
}
