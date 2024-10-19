package com.cinema.backend.entities;

import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public class Seat {

  @Id @NotNull private String seatNumber;

  /*
   * FK to ShowTime
   */
  @NotNull @NotBlank @NotEmpty private int showID;

  @NotEmpty @NotNull private boolean booked;

  public boolean isBooked() {
    return booked;
  }

  public String getSeatNumber() {
    return seatNumber;
  }

  public void changeStatus(boolean status) {
    booked = status;
  }
}
