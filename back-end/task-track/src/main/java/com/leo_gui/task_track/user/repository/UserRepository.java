package com.leo_gui.task_track.user.repository;

import com.leo_gui.task_track.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    UserDetails findByEmail(String email);
}
