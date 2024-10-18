package com.cinema.backend.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

@Entity
public class ShowRoom {
    
    @Id
    @NotNull
    @NotBlank
    @NotEmpty
    private int showRoomID;

    @NotBlank
    private String showRoomName;

    @NotBlank
    @NotEmpty
    @NotNull
    public int numOfSeats;

    public String getShowRoomName() {
        return showRoomName;
    }

    public void setShowRoomName(String showRoomName) {
        this.showRoomName = showRoomName;
    }

}
