package org.jngcoding.hackcbs.project;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;

import org.jngcoding.hackcbs.project.API.GeminiInterface;
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
        System.out.println(key);
        //************************************/

        GeminiInterface gemini = new GeminiInterface(key);
        gemini.setSystemRole("You are a cheerful personal assistant named Luma");

        BackendServer Server = new BackendServer(gemini);
        Server.start();
    }
}