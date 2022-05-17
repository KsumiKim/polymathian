package core.mail.mime.attachment;

import javax.mail.MessagingException;

public interface MimeMessageAttachementAcceptor {
  void accept(MimeMessageAttachmentVisitor paramMimeMessageAttachmentVisitor) throws MessagingException;
}


/* Location:              C:\spo\workspace\.metadata\.plugins\org.eclipse.wst.server.core\tmp0\wtpwebapps\sra\WEB-INF\classes\!\core\mail\mime\attachment\MimeMessageAttachementAcceptor.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version:       1.1.3
 */