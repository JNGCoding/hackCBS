package org.jngcoding.cbs.project;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.Scanner;

import org.jngcoding.cbs.project.__Gemini.GeminiInterface;

import com.google.api.client.http.MultipartContent;
import com.google.genai.Client;
import com.google.genai.types.Content;
import com.google.genai.types.GenerateContentResponse;
import com.google.genai.types.Part;

public class Main {
    public static Scanner scanner = new Scanner(System.in);

    public static void main(String[] args) {
        //* Get GEMINI KEY FROM SECRETS.TXT */
        String key = "";
        try {
            try (BufferedReader reader = new BufferedReader(new FileReader(new File(System.getProperty("user.dir") + "\\secrets.txt")))) {
                String line = reader.readLine();
                key = line.split("=")[1];
            }
        } catch (IOException e) {
            System.out.println(e.getMessage());
            System.exit(0);
        }
        //************************************/

        GeminiInterface gemini = new GeminiInterface(key);
        gemini.setSystemRole("You are a doctor named Healthobot who takes symtoms and give out potential diseases, risks and threats and advised solutions in minimal prompts");

        while (true) {
            System.out.print("Enter Query: ");
            String query = scanner.nextLine();
            if (query.equals("exit")) {
                break;
            }

            String response = gemini.getReponse(query);
            System.out.println(response);
        }
    }
}