package com.cinema.backend.entities;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import java.util.Date;
import java.util.List;
import org.hibernate.validator.constraints.URL;

@Entity
public class Movie {

  public enum AgeRating {
    G,
    PG,
    PG13,
    R,
    NC17,
  }

  public enum Genre {
    ACTION,
    ADVENTURE,
    ANIMATION,
    COMEDY,
    CRIME,
    DOCUMENTARY,
    DRAMA,
    FANTASY,
    HORROR,
    MUSICAL,
    MYSTERY,
    ROMANCE,

    @JsonProperty("SCI-FI")
    SCI_FI, // Short for "Science Fiction"
    THRILLER,
    WAR,
    WESTERN,
    BIOGRAPHY,
    FAMILY,
    HISTORY,
    SPORT,
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

  @NotEmpty public List<@NotNull Genre> category;

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

  /** YouTube video ID for the trailer (not a full link) */
  @Pattern(regexp = "[A-Za-z0-9_\\-]{11}")
  public String trailerId;

  @NotNull public Boolean isRunning;

  @OneToMany(mappedBy = "movieID")
  public List<ShowTime> shows;

  @NotNull
  @Temporal(TemporalType.DATE)
  public Date releaseDate;

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
    this.trailerId = other.trailerId;
    this.isRunning = other.isRunning;
    this.shows = other.shows;
    this.releaseDate = other.releaseDate;
  }
}
