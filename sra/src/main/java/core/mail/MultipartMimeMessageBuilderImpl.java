package core.mail;

import java.io.File;
import java.nio.file.Path;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import org.springframework.mail.javamail.MimeMessageHelper;


public class MultipartMimeMessageBuilderImpl implements MultipartMimeMessageBuilder, MimeMessageBuilderFinisher {
    private final MimeMessageHelper mimeMessageHelper;
    private String from;
    private String[] to;
    private String[] cc;
    private String[] bcc;
    private String subject;
    private String text;
    private boolean html;
    private String filename;
    private File file;

    private MultipartMimeMessageBuilderImpl(MimeMessageHelper mimeMessageHelper) throws MessagingException {
        this.mimeMessageHelper = mimeMessageHelper;
    }


    public MultipartMimeMessageBuilder from(String from) throws MessagingException {
        this.from = from;
        return this;
    }


    public MultipartMimeMessageBuilder to(String... to) throws MessagingException {
        this.to = to;
        return this;
    }


    public MultipartMimeMessageBuilder cc(String... cc) throws MessagingException {
        this.cc = cc;
        return this;
    }


    public MultipartMimeMessageBuilder bcc(String... bcc) throws MessagingException {
        this.bcc = bcc;
        return this;
    }


    public MultipartMimeMessageBuilder subject(String subject) throws MessagingException {
        this.subject = subject;
        return this;
    }


    public MultipartMimeMessageBuilder text(String text, boolean html) throws MessagingException {
        this.text = text;
        this.html = html;
        return this;
    }


    public MultipartMimeMessageBuilder addAttachment(String filename, File file) {
        return null;
    }


    public MultipartMimeMessageBuilder addAttachment(String filename, Path path) {
        return null;
    }


    public MultipartMimeMessageBuilder addAttachment(String filename, byte[] input) {
        return null;
    }


    public MimeMessage build() throws MessagingException {
        if (this.from != null) {
            this.mimeMessageHelper.setFrom(this.from);
        }

        if (this.to != null) {
            this.mimeMessageHelper.setTo(this.to);
        }

        if (this.cc != null) {
            this.mimeMessageHelper.setCc(this.cc);
        }

        if (this.bcc != null) {
            this.mimeMessageHelper.setBcc(this.bcc);
        }

        if (this.subject != null) {
            this.mimeMessageHelper.setSubject(this.subject);
        }

        if (this.text != null) {
            this.mimeMessageHelper.setText(this.text, this.html);
        }

        if (this.filename != null && this.file != null) {
            this.mimeMessageHelper.addAttachment(this.filename, this.file);
        }
        return this.mimeMessageHelper.getMimeMessage();
    }

    public static MultipartMimeMessageBuilderImpl mimeMessage(MimeMessage mimeMessage) throws MessagingException {
        return new MultipartMimeMessageBuilderImpl(new MimeMessageHelper(mimeMessage, true));
    }
}
