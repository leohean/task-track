package com.leo_gui.task_track.sprint.service;

import com.leo_gui.task_track.project.model.Project;
import com.leo_gui.task_track.project.service.ProjectService;
import com.leo_gui.task_track.sprint.dto.SprintDTO;
import com.leo_gui.task_track.sprint.dto.SprintDTOMapper;
import com.leo_gui.task_track.sprint.model.Sprint;
import com.leo_gui.task_track.sprint.repository.SprintRepository;
import com.leo_gui.task_track.user.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class SprintService {
    @Autowired
    private SprintRepository sprintRepository;

    @Autowired
    private ProjectService projectService;

    @Autowired
    private SprintDTOMapper sprintDTOMapper;

    public Sprint createSprint(Integer projectId, Sprint sprint){

        Project project = projectService.getProject(projectId);

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = (User)authentication.getPrincipal();

        sprint.setProject(project);
        sprint.setCreatedAt(LocalDateTime.now());
        sprint.setCreatedBy(user);
        sprint.setLastUpdateAt(LocalDateTime.now());
        sprint.setLastUpdateBy(user);

        Sprint saveSprint = sprintRepository.save(sprint);
        return saveSprint;
    }

    public Sprint updateSprint(Integer id, Sprint sprint){
        Optional<Sprint> sprintOptional = sprintRepository.findById(id);
        if (sprintOptional.isPresent()) {
            Sprint existingSprint = sprintOptional.get();
            existingSprint.setName(sprint.getName());
            existingSprint.setDescription(sprint.getDescription());
            existingSprint.setLastUpdateAt(LocalDateTime.now());
            return sprintRepository.save(existingSprint);
        }
        return null;
    }

    public void deleteSprintById(Integer id){sprintRepository.deleteById(id);}

    public Page<SprintDTO> findAllSprintsByProject(Project project, Pageable pageable){
        return sprintRepository.findAllByProject(project, pageable).map(sprintDTOMapper);
    }

    public Sprint getSprint(Integer id) {
        return sprintRepository.findById(id).orElseThrow(() -> new RuntimeException("Sprint not found"));
    }
}
