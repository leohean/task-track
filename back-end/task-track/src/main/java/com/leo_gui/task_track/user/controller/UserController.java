package com.leo_gui.task_track.user.controller;

import com.leo_gui.task_track.user.model.User;
import com.leo_gui.task_track.user.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("user")
public class UserController {
    @Autowired
    private UserService userService;

    @Operation(description = "Atualiza dados do usuário.")
    @PutMapping()
    public ResponseEntity<User> updateUser(@RequestBody User user){
        return ResponseEntity.ok().body(userService.updateUser(user));
    }
}
