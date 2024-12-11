package com.cinema.backend.controllers;

import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.NOT_FOUND;

import com.cinema.backend.entities.ShowTime;
import com.cinema.backend.records.ShowTimeInfo;
import com.cinema.backend.repositories.MovieRepository;
import com.cinema.backend.repositories.ShowRoomRepository;
import com.cinema.backend.repositories.ShowTimeRepository;
import jakarta.validation.Valid;
import java.time.Duration;
import java.time.Instant;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/shows")
public class ShowTimesController {

  private final MovieRepository movieRepository;

  private final ShowTimeRepository showTimeRepository;

  private final ShowRoomRepository showRoomRepository;

  @Autowired
  public ShowTimesController(
      MovieRepository movieRepository,
      ShowTimeRepository showTimeRepository,
      ShowRoomRepository showRoomRepository) {
    this.movieRepository = movieRepository;
    this.showTimeRepository = showTimeRepository;
    this.showRoomRepository = showRoomRepository;
  }

  @GetMapping("getAll")
  public List<ShowTime> getRunningShows() {
    return showTimeRepository.findAll();
  }

  @GetMapping("/get/{id}")
  public ShowTime getRunningShows(@PathVariable Integer id) {
    return showTimeRepository
        .findById(id)
        .orElseThrow(() -> new ResponseStatusException(NOT_FOUND));
  }

  @PostMapping("add")
  public void addShowTime(@RequestBody @Valid ShowTimeInfo showTimeInfo) {
    ShowTime toAdd = showTimeInfo.toEntity();
    Instant toAddEnd = toAdd.getShowTime().plus(Duration.ofMinutes(toAdd.getDurationMinutes()));
    List<ShowTime> showTimesConflicts = showTimeRepository.findAll();
    boolean conflictFound = false;
    for (ShowTime showTimesConflict : showTimesConflicts) {
      var otherShowTime = showTimesConflict.getShowTime();
      var otherShowTimeEnd =
          otherShowTime.plus(Duration.ofMinutes(showTimesConflict.getDurationMinutes()));
      if (Math.min(toAddEnd.getEpochSecond(), otherShowTimeEnd.getEpochSecond())
              - Math.max(
                  toAdd.getShowTime().getEpochSecond(),
                  showTimesConflict.getShowTime().getEpochSecond())
          >= 0) {
        conflictFound = true;
        break;
      }
    }
    if (!conflictFound) {
      Integer seatsToAdd =
          showRoomRepository
              .findById(toAdd.getShowRoomID())
              .orElseThrow(() -> new ResponseStatusException(NOT_FOUND))
              .getNumOfSeats();
      toAdd.setSeatsList(seatsToAdd);
      System.out.println("Seats: " + seatsToAdd);
      //      toAdd.setShowTime(showTimeInfo.showTime);
      ////      toAdd.setDuration(showTimeInfo.duration);
      ////      toAdd.setShowRoom(convertedEntity.getShowRoom());
      if (toAdd.getMovieID() != 0) {
        movieRepository
            .findById(toAdd.getMovieID())
            .orElseThrow(() -> new ResponseStatusException(NOT_FOUND))
            .shows
            .add(toAdd);
        toAdd.setMovieID(toAdd.getMovieID());
      }
      showTimeRepository.save(toAdd);
    } else {
      throw new ResponseStatusException(BAD_REQUEST, "Show time overlaps with existing show time");
    }
  }

  @PutMapping("update")
  public void changeShowTime(@RequestBody @Valid ShowTimeInfo showTimeInfo) {
    ShowTime convertedEntity = showTimeInfo.toEntity();
    ShowTime toChange =
        showTimeRepository
            .findById(convertedEntity.showID)
            .orElseThrow(() -> new ResponseStatusException(NOT_FOUND));
    movieRepository
        .findById(toChange.getMovieID())
        .orElseThrow(() -> new ResponseStatusException(NOT_FOUND))
        .shows
        .remove(toChange);
    toChange.setMovieID(convertedEntity.getMovieID());
    // NEED TO ADD CHECKS FOR IF THE MOVIE DOESN'T WORK, AND UPDATE MOVIE LIST AS BELOW
    toChange.setDurationMinutes(convertedEntity.getDurationMinutes());
    toChange.setShowRoom(convertedEntity.getShowRoomID());
    toChange.setShowTime(convertedEntity.getShowTime());
    movieRepository
        .findById(toChange.getMovieID())
        .orElseThrow(() -> new ResponseStatusException(NOT_FOUND))
        .shows
        .add(toChange);
  }

  /*
  @PutMapping("updateSeats")
  public void updateSeat(@RequestBody @Valid ShowTimeInfo showTimeInfo, Integer seatToChange) {
    ShowTime toChange = showTimeInfo.toEntity();
    // when booked, will add seats
    // not a moment before nor after
  }
  */

  @DeleteMapping("delete")
  public void removeShowTime(@PathVariable Integer showID) {
    ShowTime toRemove =
        showTimeRepository
            .findById(showID)
            .orElseThrow(() -> new ResponseStatusException(NOT_FOUND));
    showTimeRepository.deleteById(showID);
    movieRepository
        .findById(toRemove.getMovieID())
        .orElseThrow(() -> new ResponseStatusException(NOT_FOUND))
        .shows
        .remove(toRemove);
  }
}
