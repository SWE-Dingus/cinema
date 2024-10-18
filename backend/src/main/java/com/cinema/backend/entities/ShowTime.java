package com.cinema.backend.entities;

import java.sql.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

@Entity
public class ShowTime {
    
    @Id
    @GeneratedValue
    public int showID;

    /*
     * FK to movie
     */
    @NotBlank
    @NotEmpty
    private long movieID;

    @NotBlank
    @NotEmpty
    @NotNull
    private Date showTime;

    @NotBlank
    private Date duration;

    public Date getShowTime() {
        return showTime;
    }

    public Date getDuration() {
        return duration;
    }

}
