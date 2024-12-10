package com.cinema.backend.records;

import jakarta.validation.constraints.Email;

public record SuspendUserInfo(@Email String email) {}
