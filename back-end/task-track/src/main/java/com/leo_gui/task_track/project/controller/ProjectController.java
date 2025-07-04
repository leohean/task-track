package com.leo_gui.task_track.project.controller;

import com.leo_gui.task_track.project.dto.ProjectDTO;
import com.leo_gui.task_track.project.model.Project;
import com.leo_gui.task_track.project.service.ProjectService;
import com.leo_gui.task_track.sprint.dto.SprintDTO;
import com.leo_gui.task_track.user.dto.UserDTO;
import com.leo_gui.task_track.user.model.User;

import io.swagger.v3.oas.annotations.Operation;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("project")
public class ProjectController {
    @Autowired
    private ProjectService projectService;

    @Operation(description = "Cria um projeto novo.")
    @PostMapping()
    public ResponseEntity createProject(@RequestBody ProjectDTO project){
        return ResponseEntity.ok().body(projectService.createProject(project));
    }

    @Operation(description = "Pega o projeto especificado pelo id.")
    @GetMapping("{id}")
    public ResponseEntity getProject(@PathVariable Integer id){
        return ResponseEntity.ok().body(projectService.getProject(id));
    }

    @Operation(description = "Atualiza o projeto especificado pelo id.")
    @PutMapping("{id}")
    public ResponseEntity updateProject(@PathVariable Integer id, @RequestBody ProjectDTO project){
        return ResponseEntity.ok().body(projectService.updateProject(id, project));
    }

    @Operation(description = "Deleta o projeto indicado pelo id fornecido.")
    @DeleteMapping("{id}")
    public ResponseEntity deleteProject(@PathVariable Integer id){
        projectService.deleteProjectById(id);
        return ResponseEntity.ok().body("Projeto deletado com sucesso!");
    }

    @GetMapping()
    public Page<Project> getProjects(Pageable pageable){
        return projectService.findAllProjects(pageable);
    }

    @Operation(description = "Retorna de forma paginada as sprints de um projeto.")
    @GetMapping("{id}/sprints")
    public ResponseEntity<Page<SprintDTO>> getSprintsByProject(@PathVariable Integer id, Pageable page){
        Project project = projectService.getProject(id);
        return ResponseEntity.ok().body(projectService.findAllSprintsByProject(project, page));
    }
}
