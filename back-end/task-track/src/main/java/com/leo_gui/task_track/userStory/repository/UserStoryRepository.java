package com.leo_gui.task_track.userStory.repository;

import com.leo_gui.task_track.userStory.model.UserStory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserStoryRepository extends JpaRepository<UserStory, Integer> {
}
