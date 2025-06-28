package com.leo_gui.task_track.userStory.controller;

import com.leo_gui.task_track.project.model.Project;
import com.leo_gui.task_track.sprint.dto.SprintDTO;
import com.leo_gui.task_track.userStory.model.UserStory;
import com.leo_gui.task_track.userStory.service.UserStoryService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("userstory")
public class UserStoryController {
    @Autowired
    private UserStoryService userStoryService;

    @PostMapping("{sprintId}")
    @Operation(description = "Cria uma user story nova.")
    public ResponseEntity createUserStory(@PathVariable Integer sprintId, @RequestBody UserStory userStory) {
        return ResponseEntity.ok().body(userStoryService.createUserStory(sprintId, userStory));
    }

    @PutMapping("{id}")
    @Operation(description = "Atualiza a Sprint.")
    public ResponseEntity updateUserStory(@PathVariable Integer id, @RequestBody UserStory userStory) {
        return ResponseEntity.ok().body(userStoryService.updateUserStory(id, userStory));
    }

    @DeleteMapping("{id}")
    @Operation(description = "Deleta uma user story indicada pelo id fornecido.")
    public ResponseEntity deleteUserStoryById(@PathVariable Integer id) {
        userStoryService.deleteUserStoryById(id);
        return ResponseEntity.ok().body("User story deletada com sucesso!");
    }

    @GetMapping("{sprintId}")
    @Operation(description = "Retorna de forma paginada as UserStories/Tasks de uma sprint.")
    public ResponseEntity<Page<UserStory>> getUserStoriesBySprint(@PathVariable Integer sprintId, Pageable page){
        return ResponseEntity.ok().body(userStoryService.findAllUserStoriesBySprint(sprintId, page));
    }
}
