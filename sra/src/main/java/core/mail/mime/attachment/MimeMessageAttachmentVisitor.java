package core.mail.mime.attachment;

import javax.mail.MessagingException;

public interface MimeMessageAttachmentVisitor {
  void visit(FileMimeMessageAttachment paramFileMimeMessageAttachment) throws MessagingException;
  
  void visit(PathMimeMessageAttachment paramPathMimeMessageAttachment) throws MessagingException;
  
  void visit(ByteArrayMimeMessageAttachment paramByteArrayMimeMessageAttachment) throws MessagingException;
}


/* Location:              C:\spo\workspace\.metadata\.plugins\org.eclipse.wst.server.core\tmp0\wtpwebapps\sra\WEB-INF\classes\!\core\mail\mime\attachment\MimeMessageAttachmentVisitor.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version:       1.1.3
 */