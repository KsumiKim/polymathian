package core.mail.mime;

import java.io.File;
import java.nio.file.Path;

public interface MultipartMimeMessageBuilder extends MimeMessageBuilder<MultipartMimeMessageBuilder> {
  MultipartMimeMessageBuilder addAttachment(String paramString, File paramFile);

  MultipartMimeMessageBuilder addAttachment(String paramString, Path paramPath);

  MultipartMimeMessageBuilder addAttachment(String paramString, byte[] paramArrayOfbyte);
}
