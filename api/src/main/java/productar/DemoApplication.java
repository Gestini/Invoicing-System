package productar;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.event.EventListener;

import jakarta.mail.MessagingException;

import org.springframework.boot.context.event.ApplicationReadyEvent;

import productar.services.EmailSenderService;

@SpringBootApplication
public class DemoApplication {
	@Autowired
	private EmailSenderService senderService;

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

	// @EventListener(ApplicationReadyEvent.class)	
	// public void triggerMail() throws MessagingException {
	// 	senderService.sendSimpleEmail("estebaanlunaaa@gmail.com",
	// 			"This is email body",
	// 			"This is email subject");

	// }
}
