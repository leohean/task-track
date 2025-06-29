package com.leo_gui.task_track.userStory.controller;

import com.leo_gui.task_track.project.model.Project;
import com.leo_gui.task_track.sprint.dto.SprintDTO;
import com.leo_gui.task_track.sprint.model.Sprint;
import com.leo_gui.task_track.sprint.service.SprintService;
import com.leo_gui.task_track.userStory.dto.UserStoryDTO;
import com.leo_gui.task_track.userStory.model.UserStory;
import com.leo_gui.task_track.userStory.service.UserStoryService;
import io.swagger.v3.oas.annotations.Operation;

import java.util.List;

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

    @Autowired
    private SprintService sprintService;

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

    @Operation(description = "Retorna de forma paginada as user stories de uma sprint.")
    @GetMapping("{id}/userstories")
    public ResponseEntity<Page<UserStoryDTO>> getUserStoriesBySprint(@PathVariable Integer id, Pageable page){
        Sprint sprint= sprintService.getSprint(id);
        return ResponseEntity.ok().body(userStoryService.findAllUserStoriesBySprint(sprint, page));
    }
}
