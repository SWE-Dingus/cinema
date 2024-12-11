package com.cinema.backend.controllers;

import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.NOT_FOUND;

import com.cinema.backend.entities.Booking;
import com.cinema.backend.entities.Movie;
import com.cinema.backend.entities.ShowTime;
import com.cinema.backend.entities.Ticket;
import com.cinema.backend.entities.User;
import com.cinema.backend.records.BookingInfo;
import com.cinema.backend.repositories.BookingRepository;
import com.cinema.backend.repositories.MovieRepository;
import com.cinema.backend.repositories.ShowTimeRepository;
import com.cinema.backend.repositories.TicketRepository;
import com.cinema.backend.repositories.UserRepository;
import com.cinema.backend.services.EmailService;
import jakarta.mail.MessagingException;
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

  private final EmailService emailService;
  private final MovieRepository movieRepository;

  @Autowired
  public BookingsController(
      BookingRepository bookingRepository,
      ShowTimeRepository showTimeRepository,
      TicketRepository ticketRepository,
      UserRepository userRepository,
      EmailService emailService,
      MovieRepository movieRepository) {
    this.bookingRepository = bookingRepository;
    this.showTimeRepository = showTimeRepository;
    this.ticketRepository = ticketRepository;
    this.userRepository = userRepository;
    this.emailService = emailService;
    this.movieRepository = movieRepository;
  }

  // This should only be called when a user asks for more information about a booking
  // Ex: Looking in orders page, wants to view details of specific booking
  @GetMapping("/get/{id}")
  public Booking getBookingById(@PathVariable Integer id) {
    return bookingRepository.findById(id).orElseThrow(() -> new ResponseStatusException(NOT_FOUND));
  }

  @PostMapping("/create")
  public void createBooking(@Valid @RequestBody BookingInfo bookingInfo) throws MessagingException {
    // TODO: Make BookingInfo entity, have in a list of tickets INSIDE the entity, create those
    // tickets

    Booking bookingObject = bookingInfo.toEntity();
    bookingObject.setTime(Instant.now());
    // System.out.println("Size of tickets list in booking info: " +
    // bookingInfo.getTickets().size());
    bookingObject.setTicketsList(bookingInfo.getTickets().size());
    bookingObject = bookingRepository.save(bookingObject);
    ShowTime show =
        showTimeRepository
            .findById(bookingObject.getShowId())
            .orElseThrow(
                () ->
                    new ResponseStatusException(
                        NOT_FOUND, "Booking's showtime could not be found"));
    // System.out.println("Going to add tickets to Booking object");
    for (int i = 0; i < bookingInfo.getTickets().size(); i++) {
      Ticket ticketToAdd = bookingInfo.getTickets().get(i).toEntity();
      ticketToAdd.setBookingID(bookingObject.getBookingID());
      ticketToAdd.setShowRoomID(
          showTimeRepository
              .findById(bookingObject.getShowId())
              .orElseThrow(() -> new ResponseStatusException(NOT_FOUND))
              .getShowRoomID());
      ticketRepository.save(ticketToAdd);
      // Assuming seat number is 1, that will update index 0.
      if (show.getSeatsList().get(ticketToAdd.getSeat() - 1)) {
        for (int j = 0; j < bookingObject.getTickets().size(); j++) {
          ticketRepository.delete(bookingObject.getTickets().get(j));
        }
        bookingRepository.delete(bookingObject);
        throw new ResponseStatusException(
            BAD_REQUEST, "That seat has already been taken. Cancelling operation.");
      }
      show.getSeatsList().set(ticketToAdd.getSeat() - 1, true);
      bookingObject.getTickets().set(i, ticketToAdd);
    }
    System.out.println("Attempting to save ShowTime");
    showTimeRepository.save(show);
    bookingRepository.save(bookingObject);
    User toUpdate =
        userRepository
            .findById(bookingObject.getUserID())
            .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "User cannot be found"));
    System.out.println("Attempting to add Booking Object to User");
    toUpdate.getUserBookings().add(bookingObject);
    userRepository.save(toUpdate);

    Movie movie =
        movieRepository
            .findById(show.getMovieID())
            .orElseThrow(
                () -> new ResponseStatusException(NOT_FOUND, "Booking's movie could not be found"));
    StringBuilder message =
        new StringBuilder(
            "Hello! You've made an order for the movie %s. Here are your order details:\n\n"
                .formatted(movie.title));
    for (Ticket ticket : bookingObject.getTickets()) {
      var price =
          switch (ticket.getTicketType()) {
            case ADULT -> movie.adultPrice;
            case CHILD -> movie.childPrice;
            case SENIOR -> movie.seniorPrice;
          };
      message.append("%s ticket ($%.2f)\n".formatted(ticket.getTicketType(), price));
    }
    message.append("Total: $" + bookingObject.getTotal()).append("\n\n");
    message.append("Thank you for your purchase!");
    emailService.sendEmail(
        toUpdate.email,
        String.format("You've made an order for %s", movie.title),
        message.toString());
  }

  @PutMapping("/cancel/{id}")
  public void cancelBooking(@PathVariable Integer id) {
    Booking toCancel =
        bookingRepository
            .findById(id)
            .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Booking was not found"));
    if (60 <= ((Instant.now().getEpochSecond() - toCancel.getTime().getEpochSecond()) * 60)) {
      // If 60 is less than (or equal to) the remaining epoch seconds * 60, for minutes,
      // then we proceed
      if (!toCancel.getCancelled()) {
        toCancel.cancelTicket();
        for (int i = 0; i < toCancel.getTickets().size(); i++) {
          Ticket toRemoveSeat =
              ticketRepository
                  .findById(toCancel.getTickets().get(i).getTicketID())
                  .orElseThrow(
                      () -> new ResponseStatusException(NOT_FOUND, "Ticket was not found"));
          Integer seatToRemove = toRemoveSeat.getSeat();
          ShowTime toFreeSeats =
              showTimeRepository
                  .findById(toCancel.getShowId())
                  .orElseThrow(
                      () -> new ResponseStatusException(NOT_FOUND, "Show time was not found"));
          toFreeSeats.getSeatsList().set(seatToRemove - 1, false);
          showTimeRepository.save(toFreeSeats);
        }
        bookingRepository.save(toCancel);
      }
    }
  }

  @DeleteMapping("/delete/{id}")
  public void deleteBooking(@PathVariable Integer id) {
    Booking toDelete =
        bookingRepository
            .findById(id)
            .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Booking was not found"));
    for (int i = 0; i < toDelete.getTickets().size(); i++) {
      ticketRepository.deleteById(toDelete.getTickets().get(i).getTicketID());
    }
    bookingRepository.delete(toDelete);
  }
}
