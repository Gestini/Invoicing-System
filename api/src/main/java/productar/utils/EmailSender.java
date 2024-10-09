package productar.utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

@Component
public class EmailSender {
    @Autowired
    private JavaMailSender emailSender;

    public void sendEmail(String to, String subject, String message) {
        SimpleMailMessage newMail = new SimpleMailMessage();
        newMail.setFrom("fromemail@gmail.com");
        newMail.setTo(to);
        newMail.setText(message);
        newMail.setSubject(subject);
        emailSender.send(newMail);
    }
}
