package com.cinema.backend.records;

import jakarta.persistence.Entity;
import jakarta.validation.constraints.NotNull;
import java.sql.Date;

@Entity
public class ShowTimeInfo {

  public Integer showID;

  public long movieID;

  @NotNull public Integer showRoomID;

  @NotNull public Date showTime;

  @NotNull public Date duration;
}
