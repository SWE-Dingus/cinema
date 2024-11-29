package com.cinema.backend.controllers;

import static org.springframework.http.HttpStatus.NOT_FOUND;

import com.cinema.backend.entities.ShowRoom;
import com.cinema.backend.repositories.ShowRoomRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/rooms")
public class ShowRoomsController {

  private final ShowRoomRepository showRoomRepository;

  @Autowired
  public ShowRoomsController(ShowRoomRepository showRoomRepository) {
    this.showRoomRepository = showRoomRepository;
  }

  @GetMapping("getAll")
  public List<ShowRoom> getRunningShows() {
    return showRoomRepository.findAll();
  }

  @GetMapping("/getSeats/{id}")
  public Integer getSeats(@PathVariable Integer id) {
    return showRoomRepository
        .findById(id)
        .orElseThrow(() -> new ResponseStatusException(NOT_FOUND))
        .getNumOfSeats();
  }

  /*
  @PostMapping("add")
  public void addShowTime(@RequestBody @Valid ShowRoomInfo showRoomInfo) {
    ShowRoom toAdd = new ShowRoom();
    toAdd.setShowRoomName(showRoomInfo.showRoomName);
    toAdd.setNumOfSeats(showRoomInfo.numOfSeats);
  }
  */

  @DeleteMapping("delete")
  public void removeShowTime(@PathVariable Integer roomID) {
    ShowRoom toRemove =
        showRoomRepository
            .findById(roomID)
            .orElseThrow(() -> new ResponseStatusException(NOT_FOUND));
    showRoomRepository.deleteById(roomID);
  }
}
