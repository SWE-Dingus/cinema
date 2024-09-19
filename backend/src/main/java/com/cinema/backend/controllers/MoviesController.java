package com.cinema.backend.controllers;

import static org.springframework.http.HttpStatus.NOT_FOUND;
import static org.springframework.http.HttpStatus.BAD_REQUEST;

import com.cinema.backend.entities.Movie;
import com.cinema.backend.repositories.MovieRepository;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/movies")
class MoviesController {

  private final MovieRepository movieRepository;

  @Autowired
  public MoviesController(MovieRepository movieRepository) {
    this.movieRepository = movieRepository;
  }

  @PostMapping("/create")
  public Map<String, Long> createMovie(@RequestBody Movie movie) {
      if (movie.title != null) {
        movieRepository.save(movie);
        return new HashMap<>() {
          {
            this.put("id", movie.getId());
            System.out.println(movie.title + " added to DB");
          }
        };
      } else {
        System.out.println("Movie title was not entered properly.");
        return new HashMap<>() {};
      }
  };

  @GetMapping("/get/{id}")
  public Movie getMovie(@PathVariable long id) {
    return movieRepository.findById(id).orElseThrow(() -> new ResponseStatusException(NOT_FOUND));
  }

  @GetMapping("/getAll")
  public List<Movie> getMovies() {
    return movieRepository.findAll();
  }

  @PutMapping("/update/{id}")
  public void updateMovie(@PathVariable long id, @RequestBody Movie movie) {
    var dbMovie =
        movieRepository.findById(id).orElseThrow(() -> new ResponseStatusException(NOT_FOUND));
    dbMovie.copy(movie);
    movieRepository.save(dbMovie);
  }

  @DeleteMapping("/delete/{id}")
  public void deleteMovie(@PathVariable long id) {
    movieRepository.deleteById(id);
  }
}
