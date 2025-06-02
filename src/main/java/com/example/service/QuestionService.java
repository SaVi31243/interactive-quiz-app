package com.example.service;

import com.example.model.Question;
import com.example.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuestionService {

    @Autowired
    private QuestionRepository questionRepository;

    public List<Question> findByTestId(Long testId) {
        return questionRepository.findByTestId(testId);
    }

    public Question save(Question question) {
        return questionRepository.save(question);
    }

    public Question getById(Long id) {
        return questionRepository.findById(id).orElseThrow();
    }
}