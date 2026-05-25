package com.nestmate.chatbot_service.controller;

import com.nestmate.chatbot_service.dto.ChatRequest;
import com.nestmate.chatbot_service.dto.ChatResponse;
import com.nestmate.chatbot_service.service.ChatbotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/chat")
public class ChatbotController {

    @Autowired
    private ChatbotService chatbotService;

    @PostMapping
    public ChatResponse chat(@RequestBody ChatRequest request) {
        return chatbotService.chat(request);
    }
}