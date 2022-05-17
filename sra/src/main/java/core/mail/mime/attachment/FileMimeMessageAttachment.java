/*    */ package core.mail.mime.attachment;
/*    */ 
/*    */ import java.io.File;
/*    */ import javax.mail.MessagingException;
/*    */ 
/*    */ 
/*    */ public class FileMimeMessageAttachment
/*    */   implements MimeMessageAttachment<File>, MimeMessageAttachementAcceptor
/*    */ {
/*    */   private final String filename;
/*    */   private final File source;
/*    */   
/*    */   public FileMimeMessageAttachment(String filename, File source) {
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
/*    */   public File getSource() {
/* 25 */     return this.source;
/*    */   }
/*    */ 
/*    */   
/*    */   public void accept(MimeMessageAttachmentVisitor visitor) throws MessagingException {
/* 30 */     visitor.visit(this);
/*    */   }
/*    */ }


/* Location:              C:\spo\workspace\.metadata\.plugins\org.eclipse.wst.server.core\tmp0\wtpwebapps\sra\WEB-INF\classes\!\core\mail\mime\attachment\FileMimeMessageAttachment.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version:       1.1.3
 */