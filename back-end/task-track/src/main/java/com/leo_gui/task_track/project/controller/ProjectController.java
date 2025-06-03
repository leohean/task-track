package com.leo_gui.task_track.project.controller;

import com.leo_gui.task_track.project.model.Project;
import com.leo_gui.task_track.project.service.ProjectService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("project")
public class ProjectController {
    @Autowired
    private ProjectService projectService;

    @Operation(description = "Cria um projeto novo.")
    @PostMapping()
    public ResponseEntity createProject(@RequestBody Project project){
        return ResponseEntity.ok().body(projectService.createProject(project));
    }

    @Operation(description = "Deleta o projeto indicado pelo id fornecido.")
    @DeleteMapping("{id}")
    public ResponseEntity deleteProject(@PathVariable Integer id){
        projectService.deleteProjectById(id);
        return ResponseEntity.ok().body("Projeto deletado com sucesso!");
    }
}
