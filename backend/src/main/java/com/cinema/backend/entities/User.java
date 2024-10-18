package com.cinema.backend.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import java.util.List;
import org.hibernate.validator.constraints.URL;
import org.springframework.context.annotation.Primary;

public abstract class User {

    public static enum UserState {
        ACTIVE,
        INACTIVE,
        SUSPENDED,
    }

    @NotEmpty
    @NotNull
    @NotBlank
    @Id
    public long id;

    @NotEmpty
    @NotNull
    public UserState state;

    @NotEmpty
    @NotNull
    @NotBlank
    private String password;

    public boolean correctPassword(String input) {
        if (password.equals(input)) {
            return true;
        } else {
            return false;
        }
    }

    public UserState getState() {
        return state;
    }

    public void setUserState(UserState state) {
        this.state = state;
    }

}