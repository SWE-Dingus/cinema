package com.cinema.backend.controllers;

import com.cinema.backend.entities.Movie;
import com.cinema.backend.repositories.MovieRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
class MovieController {

  private final MovieRepository movieRepository;

  @Autowired
  public MovieController(MovieRepository movieRepository) {
    this.movieRepository = movieRepository;
  }

  @PostMapping("makeMovie")
  public Movie makeMovie(@RequestParam String title) {
    var movie = new Movie();
    movie.title = title;
    movieRepository.save(movie);
    return movie;
  }

  @GetMapping("getMovies")
  public List<Movie> getMovies() {
    return movieRepository.findAll();
  }
}
