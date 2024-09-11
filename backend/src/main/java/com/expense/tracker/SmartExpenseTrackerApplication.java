package com.expense.tracker;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class SmartExpenseTrackerApplication implements WebMvcConfigurer {

    public static void main(String[] args) {
        SpringApplication.run(SmartExpenseTrackerApplication.class, args);
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000") // Change this to your frontend port
                .allowedMethods("*")
                .allowedHeaders("*");
    }
}
