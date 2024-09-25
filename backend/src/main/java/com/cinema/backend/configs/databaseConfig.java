package com.cinema.backend.configs;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public class databaseConfig {
    private static final Properties properties = new Properties();

    static {
        try (InputStream input = databaseConfig.class.getClassLoader().getResourceAsStream("db.properties")) {
            if (input == null) {
                System.out.println("Sorry, unable to find db.properties");
                System.exit(1);
            }

            // Load the properties file
            properties.load(input);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static String getDbUrl() {

        return properties.getProperty("db.url");
    }

    public static String getDbUsername() {
        return properties.getProperty("db.username");
    }

    public static String getDbPassword() {
        return properties.getProperty("db.password");
    }
}

//https://www.postgresqltutorial.com/postgresql-jdbc/connecting-to-postgresql-database/