package com.cinema.backend.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Movie {

  @Id @GeneratedValue private long id;

  public String title;

  public long getId() {
    return this.id;
  }

  /**
   * Copy the contents of another {@link Movie} into this one. Does not change {@link Movie#id}.
   *
   * @param other The other {@link Movie} to copy from.
   */
  public void copy(Movie other) {
    this.title = other.title;
  }
}
