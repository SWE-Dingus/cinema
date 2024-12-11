package com.cinema.backend.controllers;

import static org.springframework.http.HttpStatus.NOT_FOUND;

import com.cinema.backend.entities.Booking;
import com.cinema.backend.entities.ShowTime;
import com.cinema.backend.entities.Ticket;
import com.cinema.backend.entities.User;
import com.cinema.backend.records.BookingInfo;
import com.cinema.backend.repositories.BookingRepository;
import com.cinema.backend.repositories.ShowTimeRepository;
import com.cinema.backend.repositories.TicketRepository;
import com.cinema.backend.repositories.UserRepository;
import jakarta.validation.Valid;
import java.time.Instant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/bookings")
public class BookingsController {

  private final BookingRepository bookingRepository;

  private final ShowTimeRepository showTimeRepository;

  private final TicketRepository ticketRepository;

  private final UserRepository userRepository;

  @Autowired
  public BookingsController(
      BookingRepository bookingRepository,
      ShowTimeRepository showTimeRepository,
      TicketRepository ticketRepository,
      UserRepository userRepository) {
    this.bookingRepository = bookingRepository;
    this.showTimeRepository = showTimeRepository;
    this.ticketRepository = ticketRepository;
    this.userRepository = userRepository;
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

    Booking bookingObject = bookingInfo.toEntity();
    bookingObject.setTime(Instant.now());
    bookingObject = bookingRepository.save(bookingObject);
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
    User toUpdate =
        userRepository
            .findById(bookingObject.getUserID())
            .orElseThrow(() -> new ResponseStatusException(NOT_FOUND));
    toUpdate.getUserBookings().add(bookingObject);
    userRepository.save(toUpdate);
  }

  @PutMapping("/cancel/{id}")
  public void cancelBooking(@PathVariable Integer id) {
    Booking toCancel =
        bookingRepository.findById(id).orElseThrow(() -> new ResponseStatusException(NOT_FOUND));
    if (60 <= ((Instant.now().getEpochSecond() - toCancel.getTime().getEpochSecond()) * 60)) {
      // If 60 is less than (or equal to) the remaining epoch seconds * 60, for minutes,
      // then we proceed
      if (!toCancel.getCancelStatus()) {
        toCancel.cancelTicket();
        for (int i = 0; i < toCancel.getTickets().size(); i++) {
          Ticket toRemoveSeat =
              ticketRepository
                  .findById(toCancel.getTickets().get(i).getTicketID())
                  .orElseThrow(() -> new ResponseStatusException(NOT_FOUND));
          Integer seatToRemove = toRemoveSeat.getSeat();
          ShowTime toFreeSeats =
              showTimeRepository
                  .findById(toRemoveSeat.getShowRoomID())
                  .orElseThrow(() -> new ResponseStatusException(NOT_FOUND));
          toFreeSeats.getSeatsList().set(seatToRemove, false);
        }
      }
    }
  }
}
