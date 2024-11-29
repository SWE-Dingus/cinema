package com.cinema.backend.records;

import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record ShowRoomInfo(
    @Id @NotNull Integer showRoomID, @NotBlank String showRoomName, Integer numOfSeats) {}
