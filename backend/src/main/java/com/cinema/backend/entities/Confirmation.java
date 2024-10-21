package com.cinema.backend.entities;

import com.cinema.backend.records.RegistrationInfo;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "confirmations")
public class Confirmation {

  @Id @Email public String email;

  @Min(100000)
  @Max(999999)
  public int confirmCode;

  @NotBlank public String password;
  @NotBlank public String name;

  public void edit(Confirmation changes) {
    this.confirmCode = changes.confirmCode;
    this.email = changes.email;
    this.password = changes.email;
    this.name = changes.name;
  }

  public static Confirmation convert(RegistrationInfo registrationInfo, int newCode) {
    Confirmation toCreate = new Confirmation();
    toCreate.confirmCode = newCode;
    toCreate.email = registrationInfo.email();
    toCreate.password = registrationInfo.password();
    toCreate.name = registrationInfo.name();
    return toCreate;
  }

  public static RegistrationInfo deconvert(Confirmation toUndo) {
    return new RegistrationInfo(toUndo.email, toUndo.password, toUndo.name);
  }
}
