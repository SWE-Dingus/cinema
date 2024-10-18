package com.cinema.backend.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

@Entity
public class Ticket {
    
    public enum TicketType {
        CHILD,
        ADULT,
        SENIOR,
    }

    @NotNull
    private TicketType type;

    @Id
    @GeneratedValue
    private long ticketID;

    /*
     * FK to seat
     */
    @NotBlank
    @NotNull
    @NotEmpty
    private String seatNumber;

    /*
     * FK to booking
     */
    @NotBlank
    @NotEmpty
    @NotNull
    private int bookingID;

    public TicketType getTicketType() {
        return type;
    }

    public String getSeat() {
        return seatNumber;
    }

}
