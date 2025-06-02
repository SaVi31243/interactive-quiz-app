package com.example.controller;

import com.example.dto.TestDto;
import com.example.model.Question;
import com.example.model.Test;
import com.example.service.QuestionService;
import com.example.service.TestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tests")
public class TestController {

    @Autowired
    private TestService testService;

    @Autowired
    private QuestionService questionService;

    @GetMapping
    public ResponseEntity<List<TestDto>> getAllTests() {
        return ResponseEntity.ok(testService.getAll());
    }

    @PostMapping
    public ResponseEntity<TestDto> createTest(@RequestBody TestDto dto) {
        Test saved = testService.saveTest(dto);
        TestDto response = new TestDto();
        response.id = saved.getId();
        response.title = saved.getTitle();
        response.description = saved.getDescription();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Test> getTest(@PathVariable Long id) {
        return ResponseEntity.ok(testService.getTestById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Test> updateTest(@PathVariable Long id, @RequestBody Test test) {
        Test updated = testService.updateTest(id, test);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTest(@PathVariable Long id) {
        testService.deleteTestById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}/questions")
    public ResponseEntity<List<Question>> getQuestionsByTest(@PathVariable Long id) {
        List<Question> questions = questionService.findByTestId(id);
        return ResponseEntity.ok(questions);
    }

    @GetMapping("/logout-trigger")
    public ResponseEntity<Void> logoutTrigger() {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
}