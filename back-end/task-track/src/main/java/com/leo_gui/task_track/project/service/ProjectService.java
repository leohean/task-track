package com.leo_gui.task_track.project.service;

import com.leo_gui.task_track.project.dto.ProjectDTO;
import com.leo_gui.task_track.project.model.Project;
import com.leo_gui.task_track.project.repository.ProjectRepository;
import com.leo_gui.task_track.sprint.dto.SprintDTO;
import com.leo_gui.task_track.sprint.dto.SprintSimpleDTOMapper;
import com.leo_gui.task_track.sprint.repository.SprintRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class ProjectService {
    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private SprintRepository sprintRepository;

    @Autowired
    private SprintSimpleDTOMapper sprintSimpleDTOMapper;

    public Project createProject(ProjectDTO dto){
        Project project = new Project();
        project.setName(dto.name());
        project.setDescription(dto.description());
        project.setCreatedAt(LocalDateTime.now());
        project.setLastUpdateAt(LocalDateTime.now());

        return projectRepository.save(project);
    }

    public Project getProject(Integer id){
        Optional<Project> foundProject = projectRepository.findById(id);
        return foundProject.isPresent() ? foundProject.get() : null;
    }

    public Project updateProject(Integer id, ProjectDTO projectDTO){
        /*Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userEmail = authentication.getName();*/

        Optional<Project> foundProject = projectRepository.findById(id);
        if (foundProject.isPresent()) {
            Project project = foundProject.get();
            project.setName(projectDTO.name());
            project.setDescription(projectDTO.description());
            project.setLastUpdateAt(LocalDateTime.now());
            return projectRepository.save(project);
        }
        return null;
    }

    public void deleteProjectById(Integer id){
        projectRepository.deleteById(id);
    }

    public Page<Project> findAllProjects(Pageable pageable){
        return projectRepository.findAll(pageable);
    }

    public Page<SprintDTO> findAllSprintsByProject(Project project, Pageable page){
        return sprintRepository.findAllByProject(project, page).map(sprintSimpleDTOMapper);
    }
}
