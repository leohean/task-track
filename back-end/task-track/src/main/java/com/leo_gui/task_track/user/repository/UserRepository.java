package com.leo_gui.task_track.user.repository;

import com.leo_gui.task_track.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
}
