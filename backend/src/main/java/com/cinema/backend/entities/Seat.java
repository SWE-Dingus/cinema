package com.cinema.backend.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;

@Entity
public class Seat {

  @Id @NotBlank private String seatNumber;

  /*
   * FK to ShowTime
   */
  @NotBlank private int showID;

  private boolean booked;

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
