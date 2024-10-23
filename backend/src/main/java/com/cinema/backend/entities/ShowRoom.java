package com.cinema.backend.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
public class ShowRoom {

  @Id @NotNull private Integer showRoomID;

  @NotBlank private String showRoomName;

  public int numOfSeats;

  public String getShowRoomName() {
    return showRoomName;
  }

  public void setShowRoomName(String showRoomName) {
    this.showRoomName = showRoomName;
  }
}
