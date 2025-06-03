package com.leo_gui.task_track.project.service;

import com.leo_gui.task_track.project.model.Project;
import com.leo_gui.task_track.project.repository.ProjectRepository;
import com.leo_gui.task_track.user.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectService {
    @Autowired
    private ProjectRepository projectRepository;

    public Project createProject(Project project){
        Project savedProject = projectRepository.save(project);
        return savedProject;
    }

    public void deleteProjectById(Integer id){
        projectRepository.deleteById(id);
    }
}
