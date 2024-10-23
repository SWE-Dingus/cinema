package com.cinema.backend.records;

import jakarta.validation.constraints.Email;

public record PasswordResetInfo(@Email String email) {}
