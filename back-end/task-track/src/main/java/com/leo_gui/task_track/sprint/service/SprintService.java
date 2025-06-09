package com.leo_gui.task_track.sprint.service;

import com.leo_gui.task_track.project.model.Project;
import com.leo_gui.task_track.sprint.dto.SprintDTO;
import com.leo_gui.task_track.sprint.dto.SprintDTOMapper;
import com.leo_gui.task_track.sprint.model.Sprint;
import com.leo_gui.task_track.sprint.repository.SprintRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class SprintService {
    @Autowired
    private SprintRepository sprintRepository;

    @Autowired
    private SprintDTOMapper sprintDTOMapper;

    public Sprint createSprint(Sprint sprint){
        Sprint saveSprint = sprintRepository.save(sprint);
        return saveSprint;
    }

    public Sprint updateSprint(Sprint sprint){
        Optional<Sprint> sprintOptional = sprintRepository.findById(sprint.getId());
        return sprintOptional.isPresent() ? sprintRepository.save(sprint) : null;
    }

    public void deleteSprintById(Integer id){sprintRepository.deleteById(id);}

    public Page<SprintDTO> findAllSprintsByProject(Project project, Pageable pageable){
        return sprintRepository.findAllByProject(project, pageable).map(sprintDTOMapper);
    }
}
