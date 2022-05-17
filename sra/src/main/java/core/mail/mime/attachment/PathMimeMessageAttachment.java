/*    */ package core.mail.mime.attachment;
/*    */ 
/*    */ import java.nio.file.Path;
/*    */ import javax.mail.MessagingException;
/*    */ 
/*    */ 
/*    */ public class PathMimeMessageAttachment
/*    */   implements MimeMessageAttachment<Path>, MimeMessageAttachementAcceptor
/*    */ {
/*    */   private final String filename;
/*    */   private final Path source;
/*    */   
/*    */   public PathMimeMessageAttachment(String filename, Path source) {
/* 14 */     this.filename = filename;
/* 15 */     this.source = source;
/*    */   }
/*    */ 
/*    */   
/*    */   public String getFilename() {
/* 20 */     return this.filename;
/*    */   }
/*    */ 
/*    */   
/*    */   public Path getSource() {
/* 25 */     return this.source;
/*    */   }
/*    */ 
/*    */   
/*    */   public void accept(MimeMessageAttachmentVisitor visitor) throws MessagingException {
/* 30 */     visitor.visit(this);
/*    */   }
/*    */ }


/* Location:              C:\spo\workspace\.metadata\.plugins\org.eclipse.wst.server.core\tmp0\wtpwebapps\sra\WEB-INF\classes\!\core\mail\mime\attachment\PathMimeMessageAttachment.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version:       1.1.3
 */