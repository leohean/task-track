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

    @Operation(description = "Cria uma sprint nova.")
    @PostMapping()
    public ResponseEntity<Sprint> createSprint(@RequestBody Sprint sprint) {
        return ResponseEntity.ok().body(sprintService.createSprint(sprint));
    }

    @Operation(description = "Deleta a sprint indicada pelo id fornecido.")
    @DeleteMapping("{id}")
    public ResponseEntity deleteSprint(@PathVariable Integer id) {
        sprintService.deleteSprintById(id);
        return ResponseEntity.ok().body("Sprint deletada com sucesso!");
    }

    @Operation(description = "Retorna de forma paginada as sprints/user stories/tasks de um projeto.")
    @GetMapping("{id}")
    public ResponseEntity<Page<SprintDTO>> getSprintsByProject(@PathVariable Integer id, Pageable page){
        Project project = projectService.getProject(id);

        Page<SprintDTO> sprintDTO = sprintService.findAllSprintsByProject(project, page);

        return ResponseEntity.ok().body(sprintDTO);
    }
}
