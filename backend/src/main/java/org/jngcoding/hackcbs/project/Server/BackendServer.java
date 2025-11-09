package org.jngcoding.hackcbs.project.Server;

import com.sun.net.httpserver.HttpServer;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpExchange;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import org.jngcoding.hackcbs.project.API.GeminiInterface;
import org.jngcoding.hackcbs.project.DatabaseSystem.DBSystem;

public class BackendServer {
    private final HttpServer server;

    public BackendServer(GeminiInterface Gemini, DBSystem system) throws IOException {
        server = HttpServer.create(new InetSocketAddress("localhost", 8080), 0);
        server.createContext("/connection/check", new ConnectionHandler());
        server.createContext("/api/gemini", new GeminiHandler(Gemini, system));
        server.createContext("/account/login", new LoginHandler(system));
        server.createContext("/account/signup", new SignupHandler(system));
        server.createContext("/account/info", new AccountInfoHandler(system));
        server.createContext("/account/infochange", new AccountInfoChangeHandler(system));
        server.createContext("/account/chathistory", new ChatHistoryHandler(system));
        server.setExecutor(null); // creates a default executor
    }

    public void start() {
        server.start();
        System.out.println("HTTP server started on port 8080");
    }

    static class ConnectionHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            String response = "Hello from Java HTTP Server!";

            // Add CORS headers
            exchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
            exchange.getResponseHeaders().add("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
            exchange.getResponseHeaders().add("Access-Control-Allow-Headers", "Content-Type");

            // Handle preflight OPTIONS request
            if ("OPTIONS".equalsIgnoreCase(exchange.getRequestMethod())) {
                exchange.sendResponseHeaders(204, -1); // No content
                return;
            }

            exchange.sendResponseHeaders(200, response.length());
            try (OutputStream os = exchange.getResponseBody()) {
                os.write(response.getBytes());
            }
        }
    }

    static class GeminiHandler implements HttpHandler {
        private final GeminiInterface Gemini;
        private final DBSystem system;

        public GeminiHandler(GeminiInterface g, DBSystem s) {
            Gemini = g;
            system = s;
        }

        private static String extractValue(String json, String key) {
            int start = json.indexOf(key);
            if (start == -1) return null;

            int colon = json.indexOf(":", start);
            int quoteStart = json.indexOf("\"", colon + 1);
            int quoteEnd = json.indexOf("\"", quoteStart + 1);

            return json.substring(quoteStart + 1, quoteEnd).trim();
        }


        @Override
        public void handle(HttpExchange exchange) throws IOException {
            // Add CORS headers
            exchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
            exchange.getResponseHeaders().add("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
            exchange.getResponseHeaders().add("Access-Control-Allow-Headers", "Content-Type");

            // Handle preflight OPTIONS request
            if ("OPTIONS".equalsIgnoreCase(exchange.getRequestMethod())) {
                exchange.sendResponseHeaders(204, -1); // No content
                return;
            }
            
            BufferedReader reader = new BufferedReader(new InputStreamReader(exchange.getRequestBody(), "UTF-8"));
            StringBuilder message = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                message.append(line);
            }

            String[] parts = message.toString().split("~");

            String response = Gemini.getReponse(parts[1]);
            exchange.sendResponseHeaders(200, response.length());
            try (OutputStream os = exchange.getResponseBody()) {
                os.write(response.getBytes());
            }

            if (response.contains("\"prescription\": null")) { return; }
            String jsonString = "{" + response.replace("```json", "").replace("```", "") + "}";
            String medication = extractValue(jsonString, "\"medication\":");
            String dosage = extractValue(jsonString, "\"dosage\":");
            String frequency = extractValue(jsonString, "\"frequency\":");
            String duration = extractValue(jsonString, "\"duration\":");

            String resultant = medication + ", " + dosage + ", " + frequency + ", " + duration;
            system.enterChatHistoryBlock(parts[0], parts[1], resultant);
        }
    }

    static class LoginHandler implements HttpHandler {
        private final DBSystem system;

        public LoginHandler(DBSystem s) {
            system = s;
        }

        @Override
        public void handle(HttpExchange exchange) throws IOException {
            // Add CORS headers
            exchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
            exchange.getResponseHeaders().add("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
            exchange.getResponseHeaders().add("Access-Control-Allow-Headers", "Content-Type");

            // Handle preflight OPTIONS request
            if ("OPTIONS".equalsIgnoreCase(exchange.getRequestMethod())) {
                exchange.sendResponseHeaders(204, -1); // No content
                return;
            }

            BufferedReader reader = new BufferedReader(new InputStreamReader(exchange.getRequestBody(), "UTF-8"));
            StringBuilder message = new StringBuilder();
            String line = "";
            while ((line = reader.readLine()) != null) {
                message.append(line);
            }

            String[] credentials = message.toString().split("~");
            if (system.usernameExists(credentials[0])) {
                boolean success = system.accountExists(credentials[0], credentials[1]);
                String response = success ? "true" : "false";
                exchange.sendResponseHeaders(200, response.length());
                try (OutputStream os = exchange.getResponseBody()) {
                    os.write(response.getBytes());
                }
            } else {
                String response = "false";
                exchange.sendResponseHeaders(200, response.length());
                try (OutputStream os = exchange.getResponseBody()) {
                    os.write(response.getBytes());
                }                
            }
        }
    }

    static class SignupHandler implements HttpHandler {
        private final DBSystem system;

        public SignupHandler(DBSystem s) {
            system = s;
        }

        @Override
        public void handle(HttpExchange exchange) throws IOException {
            // Add CORS headers
            exchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
            exchange.getResponseHeaders().add("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
            exchange.getResponseHeaders().add("Access-Control-Allow-Headers", "Content-Type");

            // Handle preflight OPTIONS request
            if ("OPTIONS".equalsIgnoreCase(exchange.getRequestMethod())) {
                exchange.sendResponseHeaders(204, -1); // No content
                return;
            }

            BufferedReader reader = new BufferedReader(new InputStreamReader(exchange.getRequestBody(), "UTF-8"));
            StringBuilder message = new StringBuilder();
            String line = "";
            while ((line = reader.readLine()) != null) {
                message.append(line);
            }

            String[] credentials = message.toString().split("~");
            if (system.usernameExists(credentials[0])) {
                String response = "false";
                exchange.sendResponseHeaders(200, response.length());
                try (OutputStream os = exchange.getResponseBody()) {
                    os.write(response.getBytes());
                }
            } else {
                boolean success = system.enterNewAccount(credentials[0], credentials[1]);
                String response = success ? "true" : "false";
                exchange.sendResponseHeaders(200, response.length());
                try (OutputStream os = exchange.getResponseBody()) {
                    os.write(response.getBytes());
                }                
            }
        }
    }

    static class AccountInfoHandler implements HttpHandler {
        private final DBSystem system;

        public AccountInfoHandler(DBSystem db) {
            system = db;
        }

        @Override
        public void handle(HttpExchange exchange) throws IOException {
            // Add CORS headers
            exchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
            exchange.getResponseHeaders().add("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
            exchange.getResponseHeaders().add("Access-Control-Allow-Headers", "Content-Type");

            // Handle preflight OPTIONS request
            if ("OPTIONS".equalsIgnoreCase(exchange.getRequestMethod())) {
                exchange.sendResponseHeaders(204, -1); // No content
                return;
            }

            BufferedReader reader = new BufferedReader(new InputStreamReader(exchange.getRequestBody(), "utf-8"));
            StringBuilder message = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                message.append(line);
            }

            String response = system.loadEntireAccount(message.toString());
            exchange.sendResponseHeaders(200, response.length());
            try (OutputStream os = exchange.getResponseBody()) {
                os.write(response.getBytes());
            }
        }
    }

    static class AccountInfoChangeHandler implements HttpHandler {
        private final DBSystem system;

        public AccountInfoChangeHandler(DBSystem db) {
            system = db;
        }

        @Override
        public void handle(HttpExchange exchange) throws IOException {
            // Add CORS headers
            exchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
            exchange.getResponseHeaders().add("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
            exchange.getResponseHeaders().add("Access-Control-Allow-Headers", "Content-Type");

            // Handle preflight OPTIONS request
            if ("OPTIONS".equalsIgnoreCase(exchange.getRequestMethod())) {
                exchange.sendResponseHeaders(204, -1); // No content
                return;
            }

            BufferedReader reader = new BufferedReader(new InputStreamReader(exchange.getRequestBody(), "utf-8"));
            StringBuilder message = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                message.append(line);
            }

            String[] parts = message.toString().split("~");
            String response = system.changePropertyOfUser(parts[0], parts[1], parts[2]) ? "true" : "false";
            exchange.sendResponseHeaders(200, response.length());
            try (OutputStream os = exchange.getResponseBody()) {
                os.write(response.getBytes());
            }
        }
    }

    static class ChatHistoryHandler implements HttpHandler {
        private final DBSystem system;

        public ChatHistoryHandler(DBSystem db) {
            system = db;
        }

        @Override
        public void handle(HttpExchange exchange) throws IOException {
            // Add CORS headers
            exchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
            exchange.getResponseHeaders().add("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
            exchange.getResponseHeaders().add("Access-Control-Allow-Headers", "Content-Type");

            // Handle preflight OPTIONS request
            if ("OPTIONS".equalsIgnoreCase(exchange.getRequestMethod())) {
                exchange.sendResponseHeaders(204, -1); // No content
                return;
            }
            
            BufferedReader reader = new BufferedReader(new InputStreamReader(exchange.getRequestBody(), "utf-8"));
            StringBuilder message = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                message.append(line);
            }

            String response = system.getLatest4ConsultationsOfBot(message.toString());
            exchange.sendResponseHeaders(200, response.length());
            try (OutputStream os = exchange.getResponseBody()) {
                os.write(response.getBytes());
            }
        }
    }
}