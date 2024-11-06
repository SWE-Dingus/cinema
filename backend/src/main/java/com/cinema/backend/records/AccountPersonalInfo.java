package com.cinema.backend.records;

import com.cinema.backend.entities.User.AuthorizationLevel;
import jakarta.validation.constraints.Email;

public class AccountPersonalInfo {

  @Email public String email;

  public String firstName;

  public String lastName;

  public String billingAddr;

  public String phoneNumber;

  public AuthorizationLevel authorizationLevel;

  public Boolean wantsMarketingEmails;
}
