package com.leo_gui.task_track.userStory.controller;

import com.leo_gui.task_track.userStory.model.UserStory;
import com.leo_gui.task_track.userStory.service.UserStoryService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("userstory")
public class UserStoryController {
    @Autowired
    private UserStoryService userStoryService;

    @Operation(description = "Cria uma user story nova.")
    @PostMapping()
    public ResponseEntity createUserStory(@RequestBody UserStory userStory) {
        return ResponseEntity.ok().body(userStoryService.createUserStory(userStory));
    }

    @Operation(description = "Deleta uma user story indicada pelo id fornecido.")
    @DeleteMapping("{id}")
    public ResponseEntity deleteUserStoryById(@PathVariable Integer id) {
        userStoryService.deleteUserStoryById(id);
        return ResponseEntity.ok().body("User story deletada com sucesso!");
    }
}
