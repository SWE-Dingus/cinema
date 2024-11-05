package com.cinema.backend.records;

import jakarta.persistence.Entity;
import jakarta.validation.constraints.NotBlank;

@Entity
public class ShowRoomInfo {

  @NotBlank public String showRoomName;

  public Integer numOfSeats;
}
