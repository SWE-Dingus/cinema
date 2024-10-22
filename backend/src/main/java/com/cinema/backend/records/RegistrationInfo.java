package com.cinema.backend.records;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record RegistrationInfo(
    @NotBlank String firstName,
    @NotBlank String lastName,
    @NotBlank String phoneNumber,
    @Email String email,
    @NotBlank String password,
    PaymentCardInfo paymentCard,
    String homeAddress) {}
