package com.cinema.backend.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Movie {

  public String title;
  @Id @GeneratedValue private long id;
}
