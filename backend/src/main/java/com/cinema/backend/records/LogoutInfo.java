package com.cinema.backend.records;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;

public record LogoutInfo(
    @Email String userEmail, @Pattern(regexp = "[A-Za-z0-9]{64}") String token) {}
