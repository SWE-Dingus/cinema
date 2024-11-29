package com.cinema.backend.services;

import static utils.Utilities.nonNullOrThrow;

import com.cinema.backend.entities.AuthenticationToken;
import com.cinema.backend.entities.User.AuthorizationLevel;
import com.cinema.backend.records.AccountCredentialsInfo;
import com.cinema.backend.records.LoginInfo;
import com.cinema.backend.records.LogoutInfo;
import com.cinema.backend.records.PaymentCardInfo;
import com.cinema.backend.repositories.AuthenticationTokenRepository;
import com.cinema.backend.repositories.PaymentCardsRepository;
import com.cinema.backend.repositories.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.constraints.Email;
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
import org.springframework.web.server.ResponseStatusException;

@Service
public class AccountsService {

  private final PaymentCardsRepository paymentCardsRepository;

  @ResponseStatus(code = HttpStatus.CONFLICT, reason = "User already exists")
  static class UserExistsException extends RuntimeException {}

  @ResponseStatus(code = HttpStatus.NOT_FOUND, reason = "User does not exist")
  static class UserNotFoundException extends RuntimeException {}

  UserRepository userRepository;
  AuthenticationTokenRepository authenticationTokenRepository;
  public static PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

  @Autowired
  public AccountsService(
      UserRepository userRepository,
      AuthenticationTokenRepository authenticationTokenRepository,
      PaymentCardsRepository paymentCardsRepository) {
    this.userRepository = userRepository;
    this.authenticationTokenRepository = authenticationTokenRepository;
    this.paymentCardsRepository = paymentCardsRepository;
  }

  public void savePaymentCard(@Email String email, PaymentCardInfo paymentCardInfo) {
    paymentCardsRepository.save(paymentCardInfo.toEntity());
  }

  public AuthenticationToken login(LoginInfo loginInfo) {
    var user = userRepository.findById(loginInfo.email()).orElseThrow(UserNotFoundException::new);
    if (!passwordEncoder.matches(loginInfo.password(), user.password)) {
      throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Incorrect password");
    }
    var authToken = new AuthenticationToken();
    authToken.userEmail = user.email;
    authToken.token = RandomStringUtils.secure().nextAlphanumeric(64);
    authToken.expires = Instant.now().plus(Duration.ofDays(1));
    authToken.authorizationLevel = user.authorizationLevel;
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

  public void ensureAdmin(HttpServletRequest request) {
    var reqUser =
        nonNullOrThrow(
            request.getHeader("CinemaAccountEmail"),
            () ->
                new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Request is missing the CinemaAccountEmail header"));
    var reqToken =
        nonNullOrThrow(
            request.getHeader("CinemaAccountToken"),
            () ->
                new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Request is missing the CinemaAccountToken header"));
    var dbToken =
        authenticationTokenRepository
            .findById(reqUser)
            .orElseThrow(
                () ->
                    new ResponseStatusException(
                        HttpStatus.UNAUTHORIZED,
                        String.format("Could not find a token for user %s", reqUser)));
    if (!dbToken.token.equals(reqToken)) {
      throw new ResponseStatusException(
          HttpStatus.UNAUTHORIZED,
          String.format("Headers contained an token for user %s", reqUser));
    }
    if (dbToken.authorizationLevel != AuthorizationLevel.ADMIN) {
      throw new ResponseStatusException(
          HttpStatus.UNAUTHORIZED,
          String.format(
              "User %s is not authorized to make this request to endpoint %s",
              reqUser, request.getRequestURI()));
    }
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
