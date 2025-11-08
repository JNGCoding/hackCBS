package org.jngcoding.hackcbs.project.DatabaseSystem;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
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

    public boolean enterNewAccount(String email, String password) {
        return trySQLOperation(() -> {
            PreparedStatement statement = DBConnection.prepareStatement(
                "INSERT INTO USERS (EMAIL, PASSWORD) VALUES (?, ?)"
            );
            statement.setString(1, email);
            statement.setString(2, password);
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

    public boolean enterChatHistoryBlock(String username, String message) {
        return false;
    }
}
