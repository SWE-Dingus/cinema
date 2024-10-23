package com.cinema.backend.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
public class Ticket {

  public enum TicketType {
    CHILD,
    ADULT,
    SENIOR,
  }

  @NotNull private TicketType type;

  @Id @GeneratedValue @NotNull private Long ticketID;

  /*
   * FK to seat
   */
  @NotBlank private String seatNumber;

  /*
   * FK to booking
   */
  @NotNull private Integer bookingID;

  public TicketType getTicketType() {
    return type;
  }

  public String getSeat() {
    return seatNumber;
  }
}
