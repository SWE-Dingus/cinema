package com.cinema.backend.entities;

import java.sql.Date;

import jakarta.persistence.Entity;
import jakarta.validation.constraints.NotEmpty;

@Entity
public class Booking {
    @NotEmpty
    public double total;

    @NotEmpty
    public Date time;

    @NotEmpty
    public String movieTitle;

    public String getMovieTitle() {
        return movieTitle;
    }

    public void setMovieTitle(String movieTitle) {
        this.movieTitle = movieTitle;
    }
}
