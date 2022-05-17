package core.mail;

import javax.mail.MessagingException;

public interface MimeMessageBuilder<T> {
    T from(String from) throws MessagingException;

    T to(String... to) throws MessagingException;

    T cc(String... cc) throws MessagingException;

    T bcc(String... bcc) throws MessagingException;

    T subject(String subject) throws MessagingException;

    T text(String text, boolean isMultipart) throws MessagingException;
}
