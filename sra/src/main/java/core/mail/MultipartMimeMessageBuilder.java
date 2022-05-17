package core.mail;

import java.io.File;
import java.nio.file.Path;

public interface MultipartMimeMessageBuilder extends MimeMessageBuilder<MultipartMimeMessageBuilder> {
    MultipartMimeMessageBuilder addAttachment(String filename, File source);

    MultipartMimeMessageBuilder addAttachment(String filename, Path source);

    MultipartMimeMessageBuilder addAttachment(String filename, byte[] source);
}
