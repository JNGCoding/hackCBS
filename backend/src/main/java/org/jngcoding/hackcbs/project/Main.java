package org.jngcoding.hackcbs.project;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;

import org.jngcoding.hackcbs.project.API.GeminiInterface;
import org.jngcoding.hackcbs.project.DatabaseSystem.DBSystem;
import org.jngcoding.hackcbs.project.Server.BackendServer;

public class Main {
    public static void main(String[] args) throws Exception {
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
        gemini.setSystemRole("""
            You are a cautious health assistant. Always respond in valid JSON format with two fields:
            1. 'content': a short, plain text message (no formatting, markdown, or emojis).
            2. 'prescription': either null or an object with the following fields:
            - 'medication': name of the medicine
            - 'dosage': recommended dose (e.g., '500mg')
            - 'frequency': how often to take it (e.g., 'Every 6-8 hours')
            - 'duration': how long to take it (e.g., 'Max 3 days')
            
            Only suggest safe over-the-counter options for common issues like pain relief, vitamins, antacids, or supplements. If the query is general, set 'prescription' to null and give lifestyle advice in 'content'. If the issue seems serious or complex, set 'prescription' to null and advise the user to consult a medical professional. Never diagnose or prescribe for serious conditions.
            """);

        DBSystem db = new DBSystem("root", "root@root123", "HACKCBS");

        BackendServer Server = new BackendServer(gemini, db);
        Server.start();
    }
}