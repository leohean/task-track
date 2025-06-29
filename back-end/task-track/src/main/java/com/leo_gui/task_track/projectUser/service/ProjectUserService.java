package com.leo_gui.task_track.projectUser.service;

import com.leo_gui.task_track.project.model.Project;
import com.leo_gui.task_track.project.service.ProjectService;
import com.leo_gui.task_track.projectUser.dto.ProjectUserDTO;
import com.leo_gui.task_track.projectUser.dto.ProjectUserDTOMapper;
import com.leo_gui.task_track.projectUser.model.ProjectUser;
import com.leo_gui.task_track.projectUser.model.ProjectUserId;
import com.leo_gui.task_track.projectUser.repository.ProjectUserRepository;
import com.leo_gui.task_track.user.model.User;
import com.leo_gui.task_track.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProjectUserService {
    
    @Autowired
    private ProjectUserRepository projectUserRepository;
    
    @Autowired
    private ProjectService projectService;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private ProjectUserDTOMapper projectUserDTOMapper;
    
    @Transactional
    public ProjectUserDTO addUserToProject(Integer projectId, Integer userId) {
        // Verificar se o projeto existe
        Project project = projectService.getProject(projectId);
        if (project == null) {
            throw new IllegalArgumentException("Project with id " + projectId + " not found.");
        }
        
        // Verificar se o usuário existe
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isEmpty()) {
            throw new IllegalArgumentException("User with id " + userId + " not found.");
        }
        User user = userOpt.get();
        
        // Verificar se o relacionamento já existe
        if (projectUserRepository.existsByProjectIdAndUserId(projectId, userId)) {
            throw new IllegalArgumentException("User " + userId + " is already part of project " + projectId);
        }
        
        // Criar o relacionamento
        ProjectUser projectUser = new ProjectUser(project, user);
        ProjectUser savedProjectUser = projectUserRepository.save(projectUser);
        return projectUserDTOMapper.apply(savedProjectUser);
    }
    
    @Transactional
    public List<ProjectUserDTO> addUsersToProject(Integer projectId, List<Integer> userIds) {
        // Verificar se o projeto existe
        Project project = projectService.getProject(projectId);
        if (project == null) {
            throw new IllegalArgumentException("Project with id " + projectId + " not found.");
        }
        
        List<ProjectUser> projectUsers = new ArrayList<>();
        
        for (Integer userId : userIds) {
            // Verificar se o usuário existe
            Optional<User> userOpt = userRepository.findById(userId);
            if (userOpt.isEmpty()) {
                throw new IllegalArgumentException("User with id " + userId + " not found.");
            }
            User user = userOpt.get();
            
            // Verificar se o relacionamento já existe
            if (projectUserRepository.existsByProjectIdAndUserId(projectId, userId)) {
                throw new IllegalArgumentException("User " + userId + " is already part of project " + projectId);
            }
            
            // Criar o relacionamento
            ProjectUser projectUser = new ProjectUser(project, user);
            projectUsers.add(projectUser);
        }
        
        // Salvar todos os relacionamentos
        List<ProjectUser> savedProjectUsers = projectUserRepository.saveAll(projectUsers);
        return savedProjectUsers.stream()
                .map(projectUserDTOMapper)
                .collect(Collectors.toList());
    }
    
    @Transactional
    public void removeUserFromProject(Integer projectId, Integer userId) {
        Optional<ProjectUser> projectUser = projectUserRepository.findByProjectIdAndUserId(projectId, userId);
        if (projectUser.isPresent()) {
            projectUserRepository.delete(projectUser.get());
        } else {
            throw new IllegalArgumentException("User " + userId + " is not part of project " + projectId);
        }
    }
    
    public List<ProjectUserDTO> getUsersByProject(Integer projectId) {
        List<ProjectUser> projectUsers = projectUserRepository.findByProjectId(projectId);
        return projectUsers.stream()
                .map(projectUserDTOMapper)
                .collect(Collectors.toList());
    }
    
    public List<ProjectUserDTO> getProjectsByUser(Integer userId) {
        List<ProjectUser> projectUsers = projectUserRepository.findByUserId(userId);
        return projectUsers.stream()
                .map(projectUserDTOMapper)
                .collect(Collectors.toList());
    }
    
    public ProjectUserDTO getProjectUser(Integer projectId, Integer userId) {
        Optional<ProjectUser> projectUser = projectUserRepository.findByProjectIdAndUserId(projectId, userId);
        return projectUser.map(projectUserDTOMapper).orElse(null);
    }
    
    public boolean isUserInProject(Integer projectId, Integer userId) {
        return projectUserRepository.existsByProjectIdAndUserId(projectId, userId);
    }
    
    public long getProjectUserCount(Integer projectId) {
        return projectUserRepository.countByProjectId(projectId);
    }
    
    @Transactional
    public void removeAllUsersFromProject(Integer projectId) {
        List<ProjectUser> projectUsers = projectUserRepository.findByProjectId(projectId);
        projectUserRepository.deleteAll(projectUsers);
    }
} 