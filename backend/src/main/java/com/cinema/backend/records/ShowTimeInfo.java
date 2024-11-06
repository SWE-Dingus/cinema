package com.cinema.backend.records;

import com.cinema.backend.entities.ShowTime;
import jakarta.validation.constraints.NotNull;
import java.sql.Date;

public record ShowTimeInfo(
    Integer showID,
    long movieID,
    @NotNull Integer showRoomID,
    @NotNull Date showTime,
    @NotNull Date duration) {
  public ShowTime toEntity() {
    var showTimes = new ShowTime();
    showTimes.setMovieID(movieID);
    showTimes.setShowTime(showTime);
    showTimes.setDuration(duration);
    showTimes.setShowRoom(showRoomID);
    return showTimes;
  }
}
