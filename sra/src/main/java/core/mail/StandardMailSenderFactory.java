package core.mail;

import javax.mail.MessagingException;

import org.springframework.mail.javamail.JavaMailSender;

import core.mail.mime.MimeMessagePreparator;
import core.mail.mime.MultipartMimeMessageBuilder;
import core.mail.mime.MultipartMimeMessageBuilderImpl;
import core.mail.mime.SimpleMimeMessageBuilder;
import core.mail.mime.SimpleMimeMessageBuilderImpl;

public class StandardMailSenderFactory implements MailSenderFactory {
    private final JavaMailSender javaMailSender;

    public StandardMailSenderFactory(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }


    public MailSenderFacade createSimpleSender(MimeMessagePreparator<SimpleMimeMessageBuilder> preparator) throws MessagingException {
        SimpleMimeMessageBuilderImpl builder = SimpleMimeMessageBuilderImpl.mimeMessage(this.javaMailSender.createMimeMessage());
        preparator.prepare(builder);
        return () -> this.javaMailSender.send(builder.build());
    }


    public MailSenderFacade createMultipartSender(MimeMessagePreparator<MultipartMimeMessageBuilder> preparator) throws MessagingException {
        MultipartMimeMessageBuilderImpl builder = MultipartMimeMessageBuilderImpl.mimeMessage(this.javaMailSender.createMimeMessage());
        preparator.prepare(builder);
        return () -> this.javaMailSender.send(builder.build());
    }
}

