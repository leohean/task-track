package com.leo_gui.task_track.userStory.repository;

import com.leo_gui.task_track.userStory.model.UserStory;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserStoryRepository extends JpaRepository<UserStory, Integer> {

    List<UserStory> findAllBySprintId(Integer sprintId);

    @Query("SELECT MAX(us.storyOrder) FROM UserStory us WHERE us.sprint.id = :sprintId")
    Integer getMaxStoryOrderBySprintId(Integer sprintId);
}
