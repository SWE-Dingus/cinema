package com.cinema.backend.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

@Entity
public class Promotion {

  @NotBlank @NotEmpty @NotNull @Id private String code;

  @NotBlank @NotEmpty @NotNull private int discount;

  public void setCode(String code) {
    this.code = code;
  }

  public int getDiscount() {
    return discount;
  }
}
