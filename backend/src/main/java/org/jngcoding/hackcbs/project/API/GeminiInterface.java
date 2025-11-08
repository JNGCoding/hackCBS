package org.jngcoding.hackcbs.project.API;

import java.util.ArrayList;
import java.util.List;

import com.google.genai.Client;
import com.google.genai.types.Content;
import com.google.genai.types.GenerateContentResponse;
import com.google.genai.types.Part;

public class GeminiInterface {
    private final Client client;
    private String role = "personal AI assistant";
    private final List<Content> ConversationHistory = new ArrayList<>();

    public GeminiInterface(String key) {
        client = Client.builder().apiKey(key).build();
    }

    public void setSystemRole(String __role__) {
        role = __role__;
    }

    public String getSystemRole() {
        return role;
    }

    public String getReponse(String text) {
        Content prompt = Content.builder().role("user").parts(Part.builder().text(role + ". " + text).build()).build();
        ConversationHistory.add(prompt);

        GenerateContentResponse response = client.models.generateContent("gemini-2.5-flash", ConversationHistory, null);

        return response.text();
    }
}