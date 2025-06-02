package com.example.controller;

import com.example.dto.QuestionDto;
import com.example.model.Question;
import com.example.model.Test;
import com.example.repository.TestRepository;
import com.example.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/questions")
public class QuestionController {

    @Autowired
    private QuestionService questionService;

    @Autowired
    private TestRepository testRepository;

    // 🟢 1. Створення питання з testId
    @PostMapping
    public ResponseEntity<Question> createQuestion(@RequestBody QuestionDto dto) {
        Test test = testRepository.findById(dto.testId)
                .orElseThrow(() -> new IllegalArgumentException("Тест не знайдено за ID: " + dto.testId));

        Question question = new Question();
        question.setText(dto.text);
        question.setOptions(dto.options);
        question.setCorrectAnswer(dto.correctAnswer);
        question.setTest(test);
        question.setTest(testRepository.findById(dto.testId).orElseThrow());

        Question saved = questionService.save(question);
        return ResponseEntity.ok(saved);
    }

    // 🟢 2. Отримати список питань по testId
    @GetMapping("/by-test/{testId}")
    public ResponseEntity<List<Question>> getByTestId(@PathVariable Long testId) {
        List<Question> questions = questionService.findByTestId(testId);
        return ResponseEntity.ok(questions);
    }

    // 🟢 3. Отримати одне питання по його id (для перевірки правильної відповіді)
    @GetMapping("/{id}")
    public ResponseEntity<Question> getQuestionById(@PathVariable Long id) {
        Question question = questionService.getById(id);
        return ResponseEntity.ok(question);
    }
}