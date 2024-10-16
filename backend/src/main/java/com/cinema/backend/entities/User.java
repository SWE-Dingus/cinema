package com.cinema.backend.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import java.util.List;
import org.hibernate.validator.constraints.URL;
import org.springframework.context.annotation.Primary;

@Entity
public class User {

    public static enum userAuth {
        disabled,
        suspended,
        customer,
        employee,
        manager,
    }

    @NotEmpty
    @Id
    public String username;

    @NotEmpty
    @Min(0)
    @Max(5)
    public userAuth userauth;

    @NotEmpty
    private String password;

    @NotEmpty
    private boolean verified;

    public String getUsername() {
        return username;
    }

    public boolean correctPassword(String input) {
        if (password.equals(input)) {
            return true;
        } else {
            return false;
        }
    }

}