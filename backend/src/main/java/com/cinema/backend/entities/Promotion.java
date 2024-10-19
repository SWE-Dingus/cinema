package com.cinema.backend.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;

@Entity
public class Promotion {

  @NotBlank @Id private String code;

  @NotBlank private int discount;

  public void setCode(String code) {
    this.code = code;
  }

  public int getDiscount() {
    return discount;
  }
}
