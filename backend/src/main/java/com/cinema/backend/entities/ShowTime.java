package com.cinema.backend.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;
import java.sql.Date;

@Entity
public class ShowTime {

  @Id @GeneratedValue @NotNull public Integer showID;

  /*
   * FK to movie
   */
  private long movieID;

  /*
   * FK to ShowRoom
   */
  @NotNull private Integer showRoomID;

  @NotNull private Date showTime;

  @NotNull private Date duration;

  public Date getShowTime() {
    return showTime;
  }

  public Date getDuration() {
    return duration;
  }

  public void setMovieID(long id) {
    this.movieID = id;
  }

  public void setShowRoom(Integer id) {
    this.showRoomID = id;
  }

  public void setShowTime(Date showTime) {
    this.showTime = showTime;
  }

  public void setDuration(Date duration) {
    this.duration = duration;
  }

  public long getMovieID() {
    return this.movieID;
  }
}
