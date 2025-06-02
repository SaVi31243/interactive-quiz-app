package com.example.service;

import com.example.dto.TestDto;
import com.example.model.Test;
import com.example.repository.TestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TestService {

    @Autowired
    private TestRepository testRepository;

    public List<Test> getAllTests() {
        return testRepository.findAll();
    }

    public Test getTestById(Long id) {
        return testRepository.findById(id).orElseThrow();
    }

    public Test createTest(Test test) {
        return testRepository.save(test);
    }

    public Test updateTest(Long id, Test test) {
        Test existing = getTestById(id);
        existing.setTitle(test.getTitle());
        existing.setDescription(test.getDescription());
        return testRepository.save(existing);
    }

    public void deleteTestById(Long id) {
        testRepository.deleteById(id);
    }

    public Test save(Test test) {
        return testRepository.save(test);
    }

    public Test saveTest(TestDto dto) {
        Test test = new Test();
        test.setTitle(dto.title);
        test.setDescription(dto.description);
        return testRepository.save(test);
    }

    public List<TestDto> getAll() {
        return testRepository.findAll().stream().map(test -> {
            TestDto dto = new TestDto();
            dto.id = test.getId();
            dto.title = test.getTitle();
            dto.description = test.getDescription();
            return dto;
        }).collect(Collectors.toList());
    }
}