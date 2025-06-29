package com.leo_gui.task_track.task.controller;

import com.leo_gui.task_track.task.model.Task;
import com.leo_gui.task_track.task.service.TaskService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("task")
public class TaskController {
    @Autowired
    private TaskService taskService;

    @Operation(description = "Cria uma task nova.")
    @PostMapping("{userStoryId}")
    public ResponseEntity createTask(@PathVariable Integer userStoryId, @RequestBody Task task) {
        taskService.createTask(userStoryId, task);
        return ResponseEntity.ok().build();
    }

    @PutMapping("{id}")
    @Operation(description = "Atualiza a Task")
    public ResponseEntity updateTask(@PathVariable Integer id, @RequestBody Task task) {
        taskService.updateTask(id, task);
        return ResponseEntity.ok().build();
    }

    @Operation(description = "Deleta uma task indicada pelo id fornecido.")
    @DeleteMapping("{id}")
    public ResponseEntity deleteTask(@PathVariable Integer id) {
        taskService.deleteTaskById(id);
        return ResponseEntity.ok().body("Task deletada com sucesso!");
    }
}
