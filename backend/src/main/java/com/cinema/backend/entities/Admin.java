package com.cinema.backend.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Admin extends User{

        @Id
    @GeneratedValue
    public long adminID;

    private void editUser() {}

    private void deleteUser() {}

    private void suspendUser() {}

    private void editMovie() {}

    private void deleteMovie() {}

    private void editPromotion() {}

    private void deletePromotion() {}

    private void setTicketPrice() {}
}
