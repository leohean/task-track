package com.leo_gui.task_track.userStory.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name="user_stories")
public class UserStory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private int idSprint;
    private String title;
    private String description;
    private int storyOrder;
    private LocalDateTime created_at;
    private int integer;
    private LocalDateTime date;
    private int lastUpdateBy;
}
