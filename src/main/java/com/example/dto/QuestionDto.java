package com.example.dto;

import java.util.List;

public class QuestionDto {
    public Long id;
    public String text;
    public List<AnswerDto> answers;
    public String correctAnswer;
    public Long testId;
    public List<String> options;
}