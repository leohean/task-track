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

    @PostMapping("{projectId}")
    @Operation(description = "Cria uma sprint nova do projeto em questão.")
    public ResponseEntity createSprint(@PathVariable Integer projectId, @RequestBody Sprint sprint) {
        sprintService.createSprint(projectId, sprint);
        return ResponseEntity.ok().build();
    }

    @PutMapping("{id}")
    @Operation(description = "Atualiza a Sprint.")
    public ResponseEntity updateProject(@PathVariable Integer id, @RequestBody Sprint sprint) {
        sprintService.updateSprint(id, sprint);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("{id}")
    @Operation(description = "Deleta a sprint indicada pelo id fornecido.")
    public ResponseEntity deleteSprint(@PathVariable Integer id) {
        sprintService.deleteSprintById(id);
        return ResponseEntity.ok().body("Sprint deletada com sucesso!");
    }

    @GetMapping("{projectId}")
    @Operation(description = "Retorna de forma paginada as Sprints/UserStories/Tasks de um projeto.")
    public ResponseEntity<Page<SprintDTO>> getSprintsByProject(@PathVariable Integer projectId, Pageable page){
        Project project = projectService.getProject(projectId);
        return ResponseEntity.ok().body(sprintService.findAllSprintsByProject(project, page));
    }
}
