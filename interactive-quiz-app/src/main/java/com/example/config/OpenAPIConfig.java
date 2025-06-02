package com.example.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenAPIConfig {

    @Bean
    OpenAPI apiInfo() {
        return new OpenAPI()
                .info(new Info().title("Quiz API")
                        .description("API для створення і проходження тестів")
                        .version("1.0"));
    }
}