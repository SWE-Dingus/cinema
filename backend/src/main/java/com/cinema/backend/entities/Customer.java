package com.cinema.backend.entities;

import jakarta.persistence.Entity;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

@Entity
public class Customer extends User{
    
    @NotEmpty
    @NotNull
    @NotBlank
    public String firstName;

    public String lastName;

    @NotBlank
    @NotEmpty
    @NotNull
    private String email;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
