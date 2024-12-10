package com.cinema.backend.records;

import com.cinema.backend.entities.Ticket;
import jakarta.validation.constraints.NotNull;

public record TicketInfo(@NotNull Ticket.TicketType ticketType, @NotNull Integer seatNum) {
  public Ticket toEntity() {
    var tickets = new Ticket();
    tickets.setTicketType(ticketType);
    // tickets.setBookingID(bookingID);
    tickets.setSeatNumber(seatNum);
    return tickets;
  }
}
