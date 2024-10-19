package com.cinema.backend.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

@Entity
public class Review {

  @Id @GeneratedValue private long reviewID;

  /*
   * FK to movie
   */
  @NotBlank @NotNull @NotEmpty private long movieID;

  @NotBlank @NotNull private float rating;

  public float getRating() {
    return rating;
  }

  public void setRating(float rating) {
    this.rating = rating;
  }
}
