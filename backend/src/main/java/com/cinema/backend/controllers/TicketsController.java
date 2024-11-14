package com.cinema.backend.controllers;

import static org.springframework.http.HttpStatus.NOT_FOUND;

import com.cinema.backend.entities.Ticket;
import com.cinema.backend.records.TicketInfo;
import com.cinema.backend.repositories.TicketRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/tickets")
public class TicketsController {
  private final TicketRepository ticketRepository;

  @Autowired
  public TicketsController(TicketRepository ticketRepository) {
    this.ticketRepository = ticketRepository;
  }

  @GetMapping("get/{id}")
  public Ticket createTicket(@PathVariable Integer ticketID) {
    return ticketRepository
        .findById(ticketID)
        .orElseThrow(() -> new ResponseStatusException(NOT_FOUND));
  }

  @PostMapping("makeTicket")
  public void createTicket(@RequestBody @Valid TicketInfo ticketInfo) {
    Ticket theTicket = ticketInfo.toEntity();
  }
}
