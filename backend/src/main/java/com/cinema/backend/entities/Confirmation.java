package com.cinema.backend.entities;

import static com.cinema.backend.entities.User.UserState.INACTIVE;

import com.cinema.backend.records.RegistrationInfo;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.*;

@Entity
@Table(name = "confirmations")
public class Confirmation {

  @Id @Email public String email;

  @NotNull public User.UserState state = INACTIVE;

  @Min(100000)
  @Max(999999)
  public int confirmCode;

  @NotBlank public String password;
  @NotBlank public String firstName;
  @NotBlank public String lastName;

  public void edit(Confirmation changes) {
    this.confirmCode = changes.confirmCode;
    this.email = changes.email;
    this.password = changes.email;
    this.firstName = changes.firstName;
    this.lastName = changes.lastName;
  }

  public static Confirmation convert(RegistrationInfo registrationInfo, int newCode) {
    Confirmation toCreate = new Confirmation();
    toCreate.confirmCode = newCode;
    toCreate.email = registrationInfo.email();
    toCreate.password = registrationInfo.password();
    toCreate.firstName = registrationInfo.firstName();
    toCreate.lastName = registrationInfo.lastName();
    return toCreate;
  }

  public static RegistrationInfo deconvert(Confirmation toUndo) {
    return new RegistrationInfo(toUndo.email, toUndo.password, toUndo.firstName, toUndo.lastName);
  }
}
