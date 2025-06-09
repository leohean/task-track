package com.leo_gui.task_track.sprint.controller;

import com.leo_gui.task_track.project.model.Project;
import com.leo_gui.task_track.project.service.ProjectService;
import com.leo_gui.task_track.sprint.dto.SprintDTO;
import com.leo_gui.task_track.sprint.model.Sprint;
import com.leo_gui.task_track.sprint.service.SprintService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("sprint")
public class SprintController {
    @Autowired
    private SprintService sprintService;
    @Autowired
    private ProjectService projectService;

    @PostMapping()
    @Operation(description = "Cria uma sprint nova.")
    public ResponseEntity<Sprint> createSprint(@RequestBody Sprint sprint) {
        return ResponseEntity.ok().body(sprintService.createSprint(sprint));
    }

    @PutMapping()
    @Operation(description = "Atualiza a Sprint.")
    public ResponseEntity updateProject(@RequestBody Sprint sprint) {
        return ResponseEntity.ok().body(sprintService.updateSprint(sprint));
    }

    @DeleteMapping("{id}")
    @Operation(description = "Deleta a sprint indicada pelo id fornecido.")
    public ResponseEntity deleteSprint(@PathVariable Integer id) {
        sprintService.deleteSprintById(id);
        return ResponseEntity.ok().body("Sprint deletada com sucesso!");
    }

    @GetMapping("{id}")
    @Operation(description = "Retorna de forma paginada as Sprints/UserStories/Tasks de um projeto.")
    public ResponseEntity<Page<SprintDTO>> getSprintsByProject(@PathVariable Integer id, Pageable page){
        Project project = projectService.getProject(id);
        return ResponseEntity.ok().body(sprintService.findAllSprintsByProject(project, page));
    }
}
