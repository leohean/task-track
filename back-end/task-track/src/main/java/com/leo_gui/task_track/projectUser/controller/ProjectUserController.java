package com.leo_gui.task_track.projectUser.controller;

import com.leo_gui.task_track.projectUser.dto.AddUsersToProjectDTO;
import com.leo_gui.task_track.projectUser.dto.ProjectUserDTO;
import com.leo_gui.task_track.projectUser.service.ProjectUserService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("projectuser")
public class ProjectUserController {
    
    @Autowired
    private ProjectUserService projectUserService;
    
    @PostMapping("project/{projectId}/user/{userId}")
    @Operation(description = "Adiciona um usuário a um projeto.")
    public ResponseEntity<ProjectUserDTO> addUserToProject(@PathVariable Integer projectId, @PathVariable Integer userId) {
        try {
            ProjectUserDTO projectUser = projectUserService.addUserToProject(projectId, userId);
            return ResponseEntity.ok(projectUser);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PostMapping("project/{projectId}/users")
    @Operation(description = "Adiciona múltiplos usuários a um projeto.")
    public ResponseEntity<List<ProjectUserDTO>> addUsersToProject(
            @PathVariable Integer projectId, 
            @RequestBody AddUsersToProjectDTO request) {
        try {
            List<ProjectUserDTO> projectUsers = projectUserService.addUsersToProject(projectId, request.userIds());
            return ResponseEntity.ok(projectUsers);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @DeleteMapping("project/{projectId}/user/{userId}")
    @Operation(description = "Remove um usuário de um projeto.")
    public ResponseEntity<Void> removeUserFromProject(
            @PathVariable Integer projectId,
            @PathVariable Integer userId) {
        try {
            projectUserService.removeUserFromProject(projectId, userId);
            return ResponseEntity.ok().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping("project/{projectId}/users")
    @Operation(description = "Retorna todos os usuários de um projeto.")
    public ResponseEntity<List<ProjectUserDTO>> getUsersByProject(@PathVariable Integer projectId) {
        List<ProjectUserDTO> users = projectUserService.getUsersByProject(projectId);
        return ResponseEntity.ok(users);
    }
    
    @GetMapping("user/{userId}/projects")
    @Operation(description = "Retorna todos os projetos de um usuário.")
    public ResponseEntity<List<ProjectUserDTO>> getProjectsByUser(@PathVariable Integer userId) {
        List<ProjectUserDTO> projects = projectUserService.getProjectsByUser(userId);
        return ResponseEntity.ok(projects);
    }
    
    @GetMapping("project/{projectId}/user/{userId}")
    @Operation(description = "Retorna o relacionamento específico entre projeto e usuário.")
    public ResponseEntity<ProjectUserDTO> getProjectUser(
            @PathVariable Integer projectId,
            @PathVariable Integer userId) {
        ProjectUserDTO projectUser = projectUserService.getProjectUser(projectId, userId);
        if (projectUser != null) {
            return ResponseEntity.ok(projectUser);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("project/{projectId}/user/{userId}/exists")
    @Operation(description = "Verifica se um usuário está em um projeto.")
    public ResponseEntity<Boolean> isUserInProject(
            @PathVariable Integer projectId,
            @PathVariable Integer userId) {
        boolean exists = projectUserService.isUserInProject(projectId, userId);
        return ResponseEntity.ok(exists);
    }
    
    @GetMapping("project/{projectId}/count")
    @Operation(description = "Retorna o número de usuários em um projeto.")
    public ResponseEntity<Long> getProjectUserCount(@PathVariable Integer projectId) {
        long count = projectUserService.getProjectUserCount(projectId);
        return ResponseEntity.ok(count);
    }
    
    @DeleteMapping("project/{projectId}/users")
    @Operation(description = "Remove todos os usuários de um projeto.")
    public ResponseEntity<Void> removeAllUsersFromProject(@PathVariable Integer projectId) {
        projectUserService.removeAllUsersFromProject(projectId);
        return ResponseEntity.ok().build();
    }
} 