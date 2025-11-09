package org.jngcoding.hackcbs.project.DatabaseSystem;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.concurrent.atomic.AtomicReference;

public final class DBSystem {
    private final String URL = "jdbc:mysql://localhost:3306/";
    public Connection DBConnection;
    public SQLException LatestException;

    @FunctionalInterface
    public static interface SQLRunnable {
        public void run() throws SQLException;
    }

    public boolean trySQLOperation(SQLRunnable runnable) {
        try {
            runnable.run();
            return true;
        } catch (SQLException exception) {
            LatestException = exception;
            return false;
        }
    }

    public DBSystem(String User, String Password, String Database) {
        boolean success = trySQLOperation(() -> {
            DBConnection = DriverManager.getConnection(URL + Database, User, Password);
        });

        if (!success) {
            System.out.println("Failed to initialize DBSystem!");
            System.out.println("Exception: " + LatestException.getMessage());
            System.exit(0);
        }
    }

    public boolean usernameExists(String username) {
        return trySQLOperation(() -> {
            PreparedStatement statement = DBConnection.prepareStatement(
                "SELECT * FROM USERS WHERE EMAIL = ?"
            );
            statement.setString(1, username);
            var resultSet = statement.executeQuery();
            if (!resultSet.next()) throw new SQLException("Username not found");
        });
    }

    public boolean accountExists(String username, String password) {
        return trySQLOperation(() -> {
            PreparedStatement statement = DBConnection.prepareStatement(
                "SELECT * FROM USERS WHERE EMAIL = ? AND PASSWORD = ?"
            );
            statement.setString(1, username);
            statement.setString(2, password);            
            var resultSet = statement.executeQuery();
            if (!resultSet.next()) throw new SQLException("Account not found");
        });
    }

    private static String generateRandomString() {
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        int length = 6;
        StringBuilder sb = new StringBuilder(length);
        java.util.Random random = new java.util.Random();

        for (int i = 0; i < length; i++) {
            int index = random.nextInt(characters.length());
            sb.append(characters.charAt(index));
        }

        return sb.toString();
    }

    public String getChatID(String email) {
        String chatID = null;
        String query = "SELECT CHAT_ID FROM USERS WHERE EMAIL = ?";

        try (PreparedStatement stmt = DBConnection.prepareStatement(query)) {
            stmt.setString(1, email);
            ResultSet rs = stmt.executeQuery();

            if (rs.next()) {
                chatID = rs.getString("CHAT_ID");
            }
        } catch (SQLException e) {
            System.out.println("Exception: " + e.getMessage());
        }

        return chatID;
    }

    public boolean enterNewAccount(String email, String password) {
        return trySQLOperation(() -> {
            PreparedStatement statement = DBConnection.prepareStatement(
                "INSERT INTO USERS (EMAIL, PASSWORD, CHAT_ID) VALUES (?, ?, ?)"
            );
            statement.setString(1, email);
            statement.setString(2, password);
            statement.setString(3, generateRandomString());
            statement.executeUpdate();
        });
    }

    public String loadEntireAccount(String email) {
        final StringBuilder result = new StringBuilder();
        final AtomicReference<PreparedStatement> statement = new AtomicReference<>();
        final AtomicReference<ResultSet> results = new AtomicReference<>();

        boolean success = trySQLOperation(() -> {
            statement.set(DBConnection.prepareStatement(
                "SELECT * FROM USERS WHERE EMAIL = ?"
            ));
            statement.get().setString(1, email);
            results.set(statement.get().executeQuery());

            if (!results.get().next()) throw new SQLException("Account not found!");

            result.append("{");
            result.append("\"email\":\"").append(results.get().getString("EMAIL")).append("\",");
            result.append("\"password\":\"").append(results.get().getString("PASSWORD")).append("\",");
            result.append("\"username\":\"").append(results.get().getString("USERNAME")).append("\",");
            result.append("\"birthdate\":\"").append(results.get().getDate("BIRTHDATE")).append("\",");
            result.append("\"phone\":\"").append(results.get().getString("PHONE")).append("\",");
            result.append("\"gender\":\"").append(results.get().getString("GENDER")).append("\",");
            result.append("\"location\":\"").append(results.get().getString("LOCATION")).append("\",");
            result.append("\"bloodgroup\":\"").append(results.get().getString("BLOODGROUP")).append("\",");
            result.append("\"height_in_cm\":").append(results.get().getInt("HEIGHT_IN_CM")).append(",");
            result.append("\"weight\":").append(results.get().getInt("WEIGHT")).append(",");
            result.append("\"allergies\":\"").append(results.get().getString("ALLERGIES")).append("\"");
            result.append("}");
        });

        if (success) {
            return result.toString();
        } else {
            return "Unexpected Error!";
        }
    }

    public boolean changePropertyOfUser(String email, String property, String value) {
        return trySQLOperation(() -> {
            String query = "UPDATE USERS SET " + property + " = ? WHERE EMAIL = ?";
            var statement = DBConnection.prepareStatement(query);
            statement.setString(1, value);
            statement.setString(2, email);
            statement.executeUpdate();
        });
    }

    public boolean enterChatHistoryBlock(String email, String user_message, String ai_message) {
        if (email.equals("Guest")) {
            return true;
        }

        String CHAT_ID = getChatID(email);        
        boolean success = trySQLOperation(() -> {
            String sql = "INSERT INTO MESSAGES(chat_id, message, sender) VALUES(?, ?, ?), (?, ?, ?)";
            try (PreparedStatement stmt = DBConnection.prepareStatement(sql)) {
                // User message
                stmt.setString(1, CHAT_ID);
                stmt.setString(2, user_message);
                stmt.setString(3, "USER");

                // AI message
                stmt.setString(4, CHAT_ID);
                stmt.setString(5, ai_message);
                stmt.setString(6, "BOT");

                stmt.executeUpdate();
            }
        });

        if (!success) {
            System.out.println(LatestException.getMessage());
        }

        return success;
    }

    public String getLatest4ConsultationsOfBot(String email) {
        String chatId = getChatID(email);
        StringBuilder result = new StringBuilder();

        String query = """
            SELECT MESSAGE, TIMESTAMP
            FROM messages
            WHERE CHAT_ID = ?
            AND SENDER = 'BOT'
            ORDER BY TIMESTAMP DESC
            LIMIT 4
        """;

        try (PreparedStatement stmt = DBConnection.prepareStatement(query)) {

            stmt.setString(1, chatId);
            try (ResultSet rs = stmt.executeQuery()) {
                while (rs.next()) {
                    String message = rs.getString("MESSAGE");
                    Timestamp timestamp = rs.getTimestamp("TIMESTAMP");
                    result.append("[").append(timestamp).append("] ").append(message).append("~");
                }
            }
        } catch (SQLException e) {
            System.out.println(e.getMessage());
            return "Error retrieving bot consultations.";
        }

        return result.toString().trim();
    }
}
