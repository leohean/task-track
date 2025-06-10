package com.leo_gui.task_track.user.service;

import com.leo_gui.task_track.user.model.User;
import com.leo_gui.task_track.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User updateUser(User user){
        Optional<User> foundUser = userRepository.findById(user.getId());

        if(foundUser.isPresent()) {
            User updatedUser = userRepository.save(user);
            return updatedUser;
        }else{
            return null;
        }
    }

}
