package com.cinema.backend.records;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record RegistrationInfo(
    @Email String email,
    @NotBlank String password,
    @NotBlank String firstName,
    @NotBlank String lastName) {}
