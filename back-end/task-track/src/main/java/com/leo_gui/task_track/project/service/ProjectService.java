package com.leo_gui.task_track.project.service;

import com.leo_gui.task_track.project.model.Project;
import com.leo_gui.task_track.project.repository.ProjectRepository;
import com.leo_gui.task_track.user.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ProjectService {
    @Autowired
    private ProjectRepository projectRepository;

    public Project createProject(Project project){
        Project savedProject = projectRepository.save(project);
        return savedProject;
    }

    public Project getProject(Integer id){
        Optional<Project> foundProject = projectRepository.findById(id);

        if(foundProject.isPresent()){
            return foundProject.get();
        }else{
            return null;
        }
    }

    public void deleteProjectById(Integer id){
        projectRepository.deleteById(id);
    }

    public Page<Project> findAllProjects(Pageable pageable){
        return projectRepository.findAll(pageable);
    }
}
