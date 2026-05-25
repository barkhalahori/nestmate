package com.nestmate.chatbot_service.service;

import com.nestmate.chatbot_service.dto.ChatRequest;
import com.nestmate.chatbot_service.dto.ChatResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.Map;

@Service
public class ChatbotService {

    @Value("${ollama.url}")
    private String ollamaUrl;

    private final RestClient restClient = RestClient.create();

    public ChatResponse chat(ChatRequest request) {

        String systemContext = """
                You are a helpful assistant for NestMate, a flatmate finder platform.
                Help users with:
                - Finding compatible flatmates
                - Filling their profile preferences (budget, sleep schedule, diet, cleanliness)
                - Understanding how the matching algorithm works
                - General questions about the platform
                Keep answers short and friendly.
                """;

        Map<String, Object> body = Map.of(
                "model", "llama3.2",
                "prompt", systemContext + "\n\nUser: " + request.getMessage(),
                "stream", false
        );

        Map response = restClient.post()
                .uri(ollamaUrl + "/api/generate")
                .header("Content-Type", "application/json")
                .body(body)
                .retrieve()
                .body(Map.class);

        String text = (String) response.get("response");
        return new ChatResponse(text);
    }
}