package com.cinema.backend.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import java.util.List;
import org.hibernate.validator.constraints.URL;

@Entity
public class Movie {

  public static enum AgeRating {
    G,
    PG,
    PG13,
    R,
    NC17,
  }

  @Id @GeneratedValue private long id;

  @NotEmpty public String title;

  @NotNull public AgeRating ageRating;

  @Min(0)
  @Max(5)
  @NotNull
  public Double reviewRating;

  @NotEmpty
  @Column(name = "movieCast")
  public List<@NotEmpty String> cast;

  @NotEmpty public String director;

  @NotEmpty public String synopsis;

  @NotEmpty public List<@NotEmpty String> category;

  @Min(0)
  @NotNull
  public Double childPrice;

  @Min(0)
  @NotNull
  public Double adultPrice;

  @Min(0)
  @NotNull
  public Double seniorPrice;

  @Min(0)
  @NotNull
  public Double onlineFee;

  @URL(regexp = "(http|https).*")
  public String posterUrl;

  @URL(regexp = "https?:\\/\\/www.youtube.com\\/embed\\/[A-Za-z0-9_\\-]{11}")
  public String trailerUrl;

  @NotNull public boolean isRunning;

  // TODO Add list for screenshots/clips of movie later

  public long getId() {
    return this.id;
  }

  /**
   * Copy the contents of another {@link Movie} into this one. Does not change {@link Movie#id}.
   *
   * @param other The other {@link Movie} to copy from.
   */
  public void copy(Movie other) {
    this.title = other.title;
    this.ageRating = other.ageRating;
    this.reviewRating = other.reviewRating;
    this.cast = other.cast;
    this.director = other.director;
    this.synopsis = other.synopsis;
    this.category = other.category;
    this.childPrice = other.childPrice;
    this.adultPrice = other.adultPrice;
    this.seniorPrice = other.seniorPrice;
    this.onlineFee = other.onlineFee;
    this.posterUrl = other.posterUrl;
    this.trailerUrl = other.trailerUrl;
    this.isRunning = other.isRunning;
  }
}
