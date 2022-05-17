package core.mail.mime;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

public interface MimeMessageBuilderFinisher {
  MimeMessage build() throws MessagingException;
}
