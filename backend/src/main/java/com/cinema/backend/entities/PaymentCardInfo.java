package com.cinema.backend.entities;

import java.sql.Date;

import jakarta.persistence.Entity;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

@Entity
public class PaymentCardInfo {
    
    @NotBlank
    @NotEmpty
    private String cardNumber;
    
    @NotBlank
    @NotEmpty
    private String billingAddr;

    @NotBlank
    @NotEmpty
    private Date experirationDate;

    /**
     * FK to user
     */
    @NotBlank
    @NotEmpty
    @NotNull
    private long userID;

    public String getCardNumber() {
        return cardNumber;
    }

    public void setCardNumber(String cardNumber) {
        this.cardNumber = cardNumber;
    }

}
