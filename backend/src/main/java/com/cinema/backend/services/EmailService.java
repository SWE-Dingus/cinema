package com.cinema.backend.services;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

  @Autowired
  private JavaMailSender mailSender;

  public void sendEmail(final String to, final String subject,
                        final String body) throws MessagingException {
    MimeMessage Mimemessage = mailSender.createMimeMessage();
    MimeMessageHelper helper = new MimeMessageHelper(Mimemessage, false, "UTF-8");
    helper.setFrom("your-email@gmail.com");
    helper.setTo(to);
    helper.setSubject(subject);
    helper.setText(body);
    mailSender.send(Mimemessage);
  }

}
