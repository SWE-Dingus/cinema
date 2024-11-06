package com.cinema.backend.components;

import com.cinema.backend.entities.ShowRoom;
import com.cinema.backend.repositories.ShowRoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements ApplicationRunner {

  private final ShowRoomRepository showRoomRepository;

  @Autowired
  public DataLoader(ShowRoomRepository showRoomRepository) {
    this.showRoomRepository = showRoomRepository;
  }

  public void run(ApplicationArguments args) {
    ShowRoom showRoom1 = new ShowRoom();
    showRoom1.setNumOfSeats(20);
    showRoom1.setShowRoomName("Room 1");
    showRoom1.setShowRoomID(1);
    showRoomRepository.save(showRoom1);

    ShowRoom showRoom2 = new ShowRoom();
    showRoom2.setNumOfSeats(20);
    showRoom2.setShowRoomName("Room 2");
    showRoom2.setShowRoomID(2);
    showRoomRepository.save(showRoom2);

    ShowRoom showRoom3 = new ShowRoom();
    showRoom3.setNumOfSeats(30);
    showRoom3.setShowRoomName("Room 3");
    showRoom3.setShowRoomID(3);
    showRoomRepository.save(showRoom3);
  }
}
