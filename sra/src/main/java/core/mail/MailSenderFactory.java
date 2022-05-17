package core.mail;

import core.mail.mime.MimeMessagePreparator;
import core.mail.mime.MultipartMimeMessageBuilder;
import core.mail.mime.SimpleMimeMessageBuilder;
import javax.mail.MessagingException;

public interface MailSenderFactory {
    MailSenderFacade createSimpleSender(MimeMessagePreparator<SimpleMimeMessageBuilder> paramMimeMessagePreparator) throws MessagingException;

    MailSenderFacade createMultipartSender(MimeMessagePreparator<MultipartMimeMessageBuilder> paramMimeMessagePreparator) throws MessagingException;
}
