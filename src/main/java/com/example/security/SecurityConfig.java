package com.example.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import static org.springframework.security.config.Customizer.withDefaults;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;

@Configuration
public class SecurityConfig {

        @Bean
        SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
                http
                                .csrf(csrf -> csrf.disable())
                                .authorizeHttpRequests(auth -> auth
                                                .requestMatchers("/swagger-ui/**", "/v3/api-docs/**").permitAll()
                                                .requestMatchers("/api/tests/**").permitAll()
                                                .requestMatchers("/api/results/**").permitAll()
                                                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                                                .anyRequest().authenticated())
                                .httpBasic(withDefaults());
                return http.build();
        }

        /**
         * @param passwordEncoder
         * @return
         */
        @Bean
        UserDetailsService users(PasswordEncoder passwordEncoder) {
                return new InMemoryUserDetailsManager(
                                User.withUsername("admin")
                                                .password(passwordEncoder.encode("admin123"))
                                                .roles("ADMIN")
                                                .build(),
                                User.withUsername("user")
                                                .password(passwordEncoder.encode("user123"))
                                                .roles("USER")
                                                .build());
        }

        @Bean
        PasswordEncoder passwordEncoder() {
                return new BCryptPasswordEncoder();
        }

}
