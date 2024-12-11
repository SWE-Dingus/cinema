package com.cinema.backend.components;

import com.cinema.backend.entities.ShowRoom;
import com.cinema.backend.entities.User;
import com.cinema.backend.entities.User.AuthorizationLevel;
import com.cinema.backend.entities.User.UserState;
import com.cinema.backend.repositories.ShowRoomRepository;
import com.cinema.backend.repositories.UserRepository;
import com.cinema.backend.services.AccountsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements ApplicationRunner {

  private final ShowRoomRepository showRoomRepository;
  private final UserRepository userRepository;

  @Autowired
  public DataLoader(ShowRoomRepository showRoomRepository, UserRepository userRepository) {
    this.showRoomRepository = showRoomRepository;
    this.userRepository = userRepository;
  }

  public void run(ApplicationArguments args) {
    var admin = new User();
    admin.firstName = "admin";
    admin.lastName = "admin";
    admin.phoneNumber = "555-555-5555";
    admin.email = "admin@admin.com";
    admin.password = AccountsService.passwordEncoder.encode("admin");
    admin.state = UserState.ACTIVE;
    admin.wantsMarketingEmails = true;
    admin.address = "White House";
    admin.authorizationLevel = AuthorizationLevel.ADMIN;
    userRepository.save(admin);

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
