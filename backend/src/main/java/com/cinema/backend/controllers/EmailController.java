package com.cinema.backend.controllers;

import com.cinema.backend.services.EmailService;
import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EmailController {

  @Autowired
  private EmailService emailService;

  // endpoint in order to send an email
  @GetMapping("/send-email")
  public String sendTestEmail() {
    try {
      String emailRecipient = "insert test email here";
      String registerSubject = "Dingus Account Creation";
      emailService.sendEmail(emailRecipient, registerSubject,
        "Congratulations! You've registered an account on Dingus!");
      return ("Sent email to " + emailRecipient);
    } catch (MessagingException e) {
      return "Failed to send email: " + e.getMessage();
    }
  }
}
