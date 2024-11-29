package com.cinema.backend.interfaces;

import jakarta.mail.MessagingException;

public interface IEmailSender {
  void sendEmail(final String to, final String subject, final String body)
      throws MessagingException;
}
