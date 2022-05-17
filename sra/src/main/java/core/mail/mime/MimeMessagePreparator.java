package core.mail.mime;

import javax.mail.MessagingException;

@FunctionalInterface
public interface MimeMessagePreparator<T extends MimeMessageBuilder<T>> {
  void prepare(T paramT) throws MessagingException;
}
