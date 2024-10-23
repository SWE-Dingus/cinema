package com.cinema.backend.records;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class EmailInfo {

  @NotBlank @Email public String email;
}
