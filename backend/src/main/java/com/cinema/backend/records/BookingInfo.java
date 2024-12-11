package com.cinema.backend.records;

import com.cinema.backend.entities.Booking;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import java.util.List;

public record BookingInfo(
    @NotNull double total,
    // @NotEmpty Date time,
    @Email @NotNull String userID,
    @NotNull int showID,
    List<TicketInfo> ticketList) {
  public Booking toEntity() {
    Booking toReturn = new Booking();
    // toReturn.setTime(time);
    toReturn.setTotal(total);
    toReturn.setShowID(showID);
    toReturn.setUserId(userID);
    toReturn.setCancelFalse();
    return toReturn;
  }

  public List<TicketInfo> getTickets() {
    return ticketList;
  }
}
