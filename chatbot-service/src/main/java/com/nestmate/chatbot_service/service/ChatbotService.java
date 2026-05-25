package com.nestmate.chatbot_service.service;

import com.nestmate.chatbot_service.dto.ChatRequest;
import com.nestmate.chatbot_service.dto.ChatResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.List;
import java.util.Map;

@Service
public class ChatbotService {

    @Value("${gemini.api.key}")
    private String apiKey;

    private final RestClient restClient = RestClient.create();

    public ChatResponse chat(ChatRequest request) {
        String url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key=" + apiKey;

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
                "contents", List.of(
                        Map.of("parts", List.of(
                                Map.of("text", systemContext + "\n\nUser: " + request.getMessage())
                        ))
                )
        );

        Map response = restClient.post()
                .uri(url)
                .header("Content-Type", "application/json")
                .body(body)
                .retrieve()
                .body(Map.class);

        List candidates = (List) response.get("candidates");
        Map firstCandidate = (Map) candidates.get(0);
        Map content = (Map) firstCandidate.get("content");
        List parts = (List) content.get("parts");
        Map firstPart = (Map) parts.get(0);
        String text = (String) firstPart.get("text");

        return new ChatResponse(text);
    }
}