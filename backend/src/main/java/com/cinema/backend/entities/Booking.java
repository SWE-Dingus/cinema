package com.cinema.backend.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import java.util.Date;
import java.util.List;

@Entity
public class Booking {

  @Id @GeneratedValue private int bookingID;

  @NotEmpty public double total;

  @NotEmpty public Date time;

  // @NotEmpty public String movieTitle;

  /*
   * FK to user
   */
  @Email @NotEmpty private String userID;

  /*
   * FK to ShowTime
   */
  @NotEmpty @NotNull @NotBlank private int showID;

  /*
   * FK to the list of Tickets
   */
  @OneToMany(mappedBy = "bookingID")
  private List<Ticket> ticketsInBooking;

  public int getBookingID() {
    return bookingID;
  }

  public List<Ticket> getTickets() {
    return ticketsInBooking;
  }

  public void setShowID(Integer newID) {
    this.showID = newID;
  }

  public void setUserId(String newID) {
    this.userID = newID;
  }

  public void setTime(Date newTime) {
    this.time = newTime;
  }

  public void setTotal(double price) {
    this.total = price;
  }

  public void addTicket(Ticket ticket) {
    ticketsInBooking.add(ticket);
  }

  public Integer getShowRoomID() {
    return showID;
  }

  // public String getMovieTitle() {
  // return movieTitle;
  // }

  // public void setMovieTitle(String movieTitle) {
  // this.movieTitle = movieTitle;
  // }
}
