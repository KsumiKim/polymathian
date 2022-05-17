package core.mail;

import javax.mail.MessagingException;
import org.springframework.mail.MailException;

public interface MailSenderFacade {
    void send() throws MessagingException, MailException;
}
