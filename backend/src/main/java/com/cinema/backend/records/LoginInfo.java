package com.cinema.backend.records;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record LoginInfo(@Email String email, @NotBlank String password) {}
