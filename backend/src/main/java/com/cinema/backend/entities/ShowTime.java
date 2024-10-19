package com.cinema.backend.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import java.sql.Date;

@Entity
public class ShowTime {

  @Id @GeneratedValue public int showID;

  /*
   * FK to movie
   */
  @NotBlank @NotEmpty private long movieID;

  /*
   * FK to ShowRoom
   */
  @NotBlank @NotNull @NotBlank private int showRoomID;

  @NotBlank @NotEmpty @NotNull private Date showTime;

  @NotBlank private Date duration;

  public Date getShowTime() {
    return showTime;
  }

  public Date getDuration() {
    return duration;
  }
}
