package com.cinema.backend.records;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record PasswordChangeInfo(
    @Email String userEmail, @NotBlank String oldPassword, @NotBlank String newPassword) {}
