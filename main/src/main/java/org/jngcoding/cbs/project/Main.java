package org.jngcoding.cbs.project;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;

import com.google.genai.Client;
import com.google.genai.types.GenerateContentResponse;

public class Main {
    public String getKey() {
        try {
            BufferedReader reader = new BufferedReader(new FileReader(new File(System.getProperty("user.dir") + "\\secrets.txt")));
            String line = reader.readLine();

            return line.split("=")[1];
        } catch (IOException e) {

            return "Error reading file!, IOException: " + e.getMessage();
        }
    }

    public static void main(String[] args) {
        Main mainObject = new Main();

        Client client = Client.builder().apiKey(mainObject.getKey()).build();
        GenerateContentResponse response =
            client.models.generateContent(
                "gemini-2.5-flash",
                "Explain how AI works in a few words",
                null
            );

        System.out.println(response.text());
    }
}