package com.example.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Result {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User user;

    @ManyToOne
    private Test test;

    private int score;
    private LocalDateTime createdAt = LocalDateTime.now();

    // Getters and setters
}