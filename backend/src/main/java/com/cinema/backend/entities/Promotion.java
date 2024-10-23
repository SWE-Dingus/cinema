package com.cinema.backend.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

@Entity
public class Promotion {

  @NotBlank @Id public String code;

  @Min(0)
  @Max(100)
  public double discountPercent;

  public void copy(Promotion newPromotion) {
    this.code = newPromotion.code;
    this.discountPercent = newPromotion.discountPercent;
  }
}
