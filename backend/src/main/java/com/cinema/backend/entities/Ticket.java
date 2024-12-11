package com.cinema.backend.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
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
  @NotNull private Integer seatNumber;
  @NotNull private Integer showRoomID;

  /*
   * FK to booking
   */
  @NotNull private Integer bookingID;

  public TicketType getTicketType() {
    return type;
  }

  public Integer getSeat() {
    return seatNumber;
  }

  public Integer getBookingID() {
    return bookingID;
  }

  public Integer getShowRoomID() {
    return showRoomID;
  }

  public void setSeatNumber(Integer numSeat) {
    this.seatNumber = numSeat;
  }

  public void setTicketType(TicketType age) {
    this.type = age;
  }

  public void setShowRoomID(Integer roomID) {
    this.showRoomID = roomID;
  }

  public void setBookingID(Integer booking) {
    this.bookingID = booking;
  }

  public Long getTicketID() {
    return ticketID;
  }
}
