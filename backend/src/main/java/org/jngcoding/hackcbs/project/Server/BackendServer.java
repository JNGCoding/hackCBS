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

public class BackendServer {
    private final HttpServer server;

    public BackendServer(GeminiInterface Gemini) throws IOException {
        server = HttpServer.create(new InetSocketAddress("localhost", 8080), 0);
        server.createContext("/connection/check", new ConnectionHandler());
        server.createContext("/api/gemini", new GeminiHandler(Gemini));
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

        public GeminiHandler(GeminiInterface g) {
            Gemini = g;
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

            String response = Gemini.getReponse(message.toString());
            exchange.sendResponseHeaders(200, response.length());
            try (OutputStream os = exchange.getResponseBody()) {
                os.write(response.getBytes());
            }
        }
    }
}