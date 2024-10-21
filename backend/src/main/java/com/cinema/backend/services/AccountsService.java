package com.cinema.backend.services;

import static com.cinema.backend.entities.User.UserState.ACTIVE;

import com.cinema.backend.entities.AuthenticationToken;
import com.cinema.backend.entities.User;
import com.cinema.backend.records.AccountCredentialsInfo;
import com.cinema.backend.records.LoginInfo;
import com.cinema.backend.records.LogoutInfo;
import com.cinema.backend.records.RegistrationInfo;
import com.cinema.backend.repositories.AuthenticationTokenRepository;
import com.cinema.backend.repositories.UserRepository;
import java.time.Duration;
import java.time.Instant;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ResponseStatus;

@Service
public class AccountsService {
  @ResponseStatus(code = HttpStatus.CONFLICT, reason = "User already exists")
  static class UserExistsException extends RuntimeException {}

  @ResponseStatus(code = HttpStatus.NOT_FOUND, reason = "User does not exist")
  static class UserNotFoundException extends RuntimeException {}

  UserRepository userRepository;
  AuthenticationTokenRepository authenticationTokenRepository;
  PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

  @Autowired
  public AccountsService(
      UserRepository userRepository, AuthenticationTokenRepository authenticationTokenRepository) {
    this.userRepository = userRepository;
    this.authenticationTokenRepository = authenticationTokenRepository;
  }

  /**
   * Register a user in the database
   *
   * @param registrationInfo The information of the user to register
   * @throws UserExistsException If the email in {@code registrationInfo} is already associated with
   *     an account
   */
  public void registerUser(RegistrationInfo registrationInfo) {
    if (userRepository.findById(registrationInfo.email()).isPresent()) {
      throw new UserExistsException();
    }
    var user = new User();
    user.email = registrationInfo.email();
    user.password = passwordEncoder.encode(registrationInfo.password());
    user.firstName = registrationInfo.firstName();
    user.lastName = registrationInfo.lastName();
    user.state = ACTIVE;
    userRepository.save(user);
    System.out.println("User should have been saved");
  }

  public AuthenticationToken login(LoginInfo loginInfo) {
    var user = userRepository.findById(loginInfo.email()).orElseThrow(UserNotFoundException::new);
    if (!passwordEncoder.matches(loginInfo.password(), user.password)) {
      throw new BadCredentialsException("Incorrect password");
    }
    var authToken = new AuthenticationToken();
    authToken.userEmail = user.email;
    authToken.token = RandomStringUtils.secure().nextAlphanumeric(64);
    authToken.expires = Instant.now().plus(Duration.ofDays(1));
    authenticationTokenRepository.save(authToken);
    return authToken;
  }

  public void logout(LogoutInfo logoutInfo) {
    var token =
        authenticationTokenRepository
            .findById(logoutInfo.userEmail())
            .orElseThrow(UserNotFoundException::new);
    if (!token.token.equals(logoutInfo.token())) {
      throw new BadCredentialsException("Incorrect token");
    }
    authenticationTokenRepository.delete(token);
  }

  public void verifyToken(AccountCredentialsInfo credentials) throws BadCredentialsException {
    var user =
        userRepository
            .findById(credentials.userEmail)
            .orElseThrow(() -> new BadCredentialsException("User not found"));
    var token =
        authenticationTokenRepository
            .findById(user.email)
            .orElseThrow(() -> new BadCredentialsException("User not found"));
    if (!passwordEncoder.matches(user.password, token.token)) {
      throw new BadCredentialsException("Incorrect token");
    }
  }
}
