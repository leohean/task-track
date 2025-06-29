package com.leo_gui.task_track.project.service;

import com.leo_gui.task_track.project.dto.ProjectDTO;
import com.leo_gui.task_track.project.model.Project;
import com.leo_gui.task_track.project.repository.ProjectRepository;
import com.leo_gui.task_track.projectUser.model.ProjectUser;
import com.leo_gui.task_track.projectUser.model.ProjectUserId;
import com.leo_gui.task_track.projectUser.repository.ProjectUserRepository;
import com.leo_gui.task_track.sprint.dto.SprintDTO;
import com.leo_gui.task_track.sprint.dto.SprintSimpleDTOMapper;
import com.leo_gui.task_track.sprint.repository.SprintRepository;
import com.leo_gui.task_track.user.model.User;
import com.leo_gui.task_track.user.model.UserRole;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ProjectService {
    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private SprintRepository sprintRepository;

    @Autowired
    private ProjectUserRepository projectUserRepository;

    @Autowired
    private SprintSimpleDTOMapper sprintSimpleDTOMapper;

    @Transactional
    public Project createProject(ProjectDTO dto){

        Project project = new Project();

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = (User)authentication.getPrincipal();

        project.setName(dto.name());
        project.setDescription(dto.description());
        project.setCreatedAt(LocalDateTime.now());
        project.setCreatedBy(user);
        project.setLastUpdateAt(LocalDateTime.now());
        project.setLastUpdateBy(user);

        project = projectRepository.save(project);

        ProjectUser projectUser = new ProjectUser(project, user);
        projectUserRepository.save(projectUser);

        return project;
    }

    public Project getProject(Integer id){
        Optional<Project> foundProject = projectRepository.findById(id);
        return foundProject.isPresent() ? foundProject.get() : null;
    }

    public Project updateProject(Integer id, ProjectDTO projectDTO){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = (User)authentication.getPrincipal();

        Optional<Project> foundProject = projectRepository.findById(id);
        if (foundProject.isPresent()) {
            Project project = foundProject.get();
            project.setName(projectDTO.name());
            project.setDescription(projectDTO.description());
            project.setLastUpdateAt(LocalDateTime.now());
            project.setLastUpdateBy(user);
            return projectRepository.save(project);
        }
        return null;
    }

    public void deleteProjectById(Integer id){
        projectRepository.deleteById(id);
    }

    public Page<Project> findAllProjects(Pageable pageable){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = (User)authentication.getPrincipal();

        if (user.getRole() == UserRole.ADMIN) {
            return projectRepository.findAll(pageable);
        }

        List<Integer> userProjectIds = projectUserRepository.findByUserId(user.getId()).stream()
            .map(projectUser -> projectUser.getProject().getId())
            .toList();

        if (userProjectIds.isEmpty()) {
            return Page.empty(pageable);
        }

        return projectRepository.findAllByIdIn(userProjectIds, pageable);
    }

    public Page<Project> findProjectsByIds(List<Integer> projectIds, Pageable pageable) {
        if (projectIds == null || projectIds.isEmpty()) {
            return Page.empty(pageable);
        }
        
        return projectRepository.findAllByIdIn(projectIds, pageable);
    }

    public Page<SprintDTO> findAllSprintsByProject(Project project, Pageable page){
        return sprintRepository.findAllByProject(project, page).map(sprintSimpleDTOMapper);
    }
}
