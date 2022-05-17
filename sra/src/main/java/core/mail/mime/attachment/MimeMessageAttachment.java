package core.mail.mime.attachment;

public interface MimeMessageAttachment<T> {
  String getFilename();
  
  T getSource();
}


/* Location:              C:\spo\workspace\.metadata\.plugins\org.eclipse.wst.server.core\tmp0\wtpwebapps\sra\WEB-INF\classes\!\core\mail\mime\attachment\MimeMessageAttachment.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version:       1.1.3
 */