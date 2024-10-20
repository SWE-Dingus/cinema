package com.cinema.backend.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import com.cinema.backend.records.RegistrationInfo;

@Entity
@Table(name = "confirmations")
public class Confirmation {

  @Id @NotNull public int confirmCode;
  @Email public String email;
  @NotBlank public String password;
  @NotBlank public String name;

  public void edit(Confirmation changes) {
    this.confirmCode = changes.confirmCode;
    this.email = changes.email;
    this.password = changes.email;
    this.name = changes.name;
  }

  public Confirmation convert(RegistrationInfo registrationInfo, int newCode) {
    Confirmation toCreate = new Confirmation();
    toCreate.confirmCode = newCode;
    toCreate.email = registrationInfo.email();
    toCreate.password = registrationInfo.password();
    toCreate.name = registrationInfo.name();
    return toCreate;
  }

  public RegistrationInfo deconvert(Confirmation toUndo) {
    RegistrationInfo registrationInfo = new RegistrationInfo(toUndo.email, toUndo.password, toUndo.name);
    return registrationInfo;
  }

}
