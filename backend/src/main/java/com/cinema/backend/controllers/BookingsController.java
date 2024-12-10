package com.cinema.backend.controllers;

import static org.springframework.http.HttpStatus.NOT_FOUND;

import com.cinema.backend.entities.Booking;
import com.cinema.backend.entities.Ticket;
import com.cinema.backend.records.BookingInfo;
import com.cinema.backend.repositories.BookingRepository;
import com.cinema.backend.repositories.ShowTimeRepository;
import com.cinema.backend.repositories.TicketRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/bookings")
public class BookingsController {

  private final BookingRepository bookingRepository;

  private final ShowTimeRepository showTimeRepository;

  private final TicketRepository ticketRepository;

  @Autowired
  public BookingsController(
      BookingRepository bookingRepository,
      ShowTimeRepository showTimeRepository,
      TicketRepository ticketRepository) {
    this.bookingRepository = bookingRepository;
    this.showTimeRepository = showTimeRepository;
    this.ticketRepository = ticketRepository;
  }

  // This should only be called when a user asks for more information about a booking
  // Ex: Looking in orders page, wants to view details of specific booking
  @GetMapping("/get/{id}")
  public Booking getBookingByid(@PathVariable Integer id) {
    return bookingRepository.findById(id).orElseThrow(() -> new ResponseStatusException(NOT_FOUND));
  }

  @PostMapping("/create/")
  public void createBooking(@Valid @RequestBody BookingInfo bookingInfo) {
    // TODO: Make BookingInfo entity, have in a list of tickets INSIDE the entity, create those
    // tickets
    Booking bookingObject = bookingRepository.save(bookingInfo.toEntity());
    for (int i = 0; i < bookingInfo.getTickets().size(); i++) {
      Ticket ticketToAdd = bookingInfo.getTickets().get(i).toEntity();
      ticketToAdd.setBookingID(bookingObject.getBookingID());
      ticketToAdd.setShowRoomID(
          showTimeRepository
              .findById(bookingObject.getShowRoomID())
              .orElseThrow(() -> new ResponseStatusException(NOT_FOUND))
              .getShowRoomID());
      ticketRepository.save(ticketToAdd);
      bookingObject.addTicket(ticketToAdd);
    }
    bookingRepository.save(bookingObject);
  }
}
