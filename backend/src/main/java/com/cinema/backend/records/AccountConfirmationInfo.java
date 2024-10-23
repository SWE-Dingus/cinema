package com.cinema.backend.records;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;

public record AccountConfirmationInfo(
    @Email String userEmail, @Min(100000) @Max(999999) int confirmationCode) {}
