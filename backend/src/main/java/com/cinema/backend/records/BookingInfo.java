package com.cinema.backend.records;

import com.cinema.backend.entities.Booking;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import java.util.Date;
import java.util.List;

public record BookingInfo(
    @NotEmpty double total,
    @NotEmpty Date time,
    @Email @NotNull String userID,
    @NotNull int showID,
    List<TicketInfo> ticketList) {
  public Booking toEntity() {
    Booking toReturn = new Booking();
    toReturn.setTime(time);
    toReturn.setTotal(total);
    toReturn.setShowID(showID);
    toReturn.setUserId(userID);
    return toReturn;
  }

  public List<TicketInfo> getTickets() {
    return ticketList;
  }
}
