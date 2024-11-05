package com.cinema.backend.controllers;

import static org.springframework.http.HttpStatus.NOT_FOUND;

import com.cinema.backend.entities.ShowTime;
import com.cinema.backend.records.ShowTimeInfo;
import com.cinema.backend.repositories.MovieRepository;
import com.cinema.backend.repositories.ShowRoomRepository;
import com.cinema.backend.repositories.ShowTimeRepository;
import jakarta.validation.Valid;
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

  @PostMapping("add")
  public void addShowTime(@RequestBody @Valid ShowTimeInfo showTimeInfo) {
    ShowTime toAdd = new ShowTime();
    toAdd.setShowTime(showTimeInfo.showTime);
    toAdd.setDuration(showTimeInfo.duration);
    toAdd.setShowRoom(showTimeInfo.showRoomID);
    if (showTimeInfo.movieID != 0) {
      movieRepository
          .findById(showTimeInfo.movieID)
          .orElseThrow(() -> new ResponseStatusException(NOT_FOUND))
          .shows
          .add(toAdd);
      toAdd.setMovieID(showTimeInfo.movieID);
    }
    showTimeRepository.save(toAdd);
  }

  @PutMapping("update")
  public void changeShowTime(@RequestBody @Valid ShowTimeInfo showTimeInfo) {
    ShowTime toChange =
        showTimeRepository
            .findById(showTimeInfo.showID)
            .orElseThrow(() -> new ResponseStatusException(NOT_FOUND));
    movieRepository
        .findById(toChange.getMovieID())
        .orElseThrow(() -> new ResponseStatusException(NOT_FOUND))
        .shows
        .remove(toChange);
    toChange.setMovieID(showTimeInfo.movieID);
    // NEED TO ADD CHECKS FOR IF THE MOVIE DOESN'T WORK, AND UPDATE MOVIE LIST AS BELOW
    toChange.setDuration(showTimeInfo.duration);
    toChange.setShowRoom(showTimeInfo.showRoomID);
    toChange.setShowTime(showTimeInfo.showTime);
    movieRepository
        .findById(toChange.getMovieID())
        .orElseThrow(() -> new ResponseStatusException(NOT_FOUND))
        .shows
        .add(toChange);
  }

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
