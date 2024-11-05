package com.cinema.backend.repositories;

import com.cinema.backend.entities.ShowRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShowRoomRepository extends JpaRepository<ShowRoom, Integer> {}
