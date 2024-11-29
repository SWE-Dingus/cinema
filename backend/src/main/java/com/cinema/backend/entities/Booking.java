package com.cinema.backend.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import java.sql.Date;

@Entity
public class Booking {

  @Id @GeneratedValue private int bookingID;

  @NotEmpty public double total;

  @NotEmpty public Date time;

  // @NotEmpty public String movieTitle;

  /*
   * FK to user
   */
  @NotEmpty @NotNull @NotBlank private long userID;

  /*
   * FK to ShowTime
   */
  @NotEmpty @NotNull @NotBlank private int showID;

  public int getBookingID() {
    return bookingID;
  }

  // public String getMovieTitle() {
  // return movieTitle;
  // }

  // public void setMovieTitle(String movieTitle) {
  // this.movieTitle = movieTitle;
  // }
}
