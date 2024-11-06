package com.cinema.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/** Entry point for the application. */
@SpringBootApplication
public class BackendApplication {

  public static void main(String[] args) {
    SpringApplication.run(BackendApplication.class, args);
  }

  //  @EventListener(ApplicationStartedEvent.class)
  //  public void createShowRooms(@Autowired ShowRoomRepository showRoomRepository) {
  //    ShowRoom showRoom1 = new ShowRoom();
  //    showRoom1.setNumOfSeats(20);
  //    showRoom1.setShowRoomName("Room 1");
  //    showRoom1.setShowRoomID(1);
  //    showRoomRepository.save(showRoom1);
  //
  //    ShowRoom showRoom2 = new ShowRoom();
  //    showRoom2.setNumOfSeats(20);
  //    showRoom2.setShowRoomName("Room 2");
  //    showRoom2.setShowRoomID(1);
  //    showRoomRepository.save(showRoom2);
  //
  //    ShowRoom showRoom3 = new ShowRoom();
  //    showRoom3.setNumOfSeats(20);
  //    showRoom3.setShowRoomName("Room 3");
  //    showRoom3.setShowRoomID(1);
  //    showRoomRepository.save(showRoom3);
  //  }
}
