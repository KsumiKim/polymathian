/*    */ package core.mail.mime.attachment;
/*    */ 
/*    */ import javax.mail.MessagingException;
/*    */ 
/*    */ public class ByteArrayMimeMessageAttachment
/*    */   implements MimeMessageAttachment<byte[]>, MimeMessageAttachementAcceptor {
/*    */   private final String filename;
/*    */   private final byte[] source;
/*    */   
/*    */   public ByteArrayMimeMessageAttachment(String filename, byte[] source) {
/* 11 */     this.filename = filename;
/* 12 */     this.source = source;
/*    */   }
/*    */ 
/*    */   
/*    */   public String getFilename() {
/* 17 */     return this.filename;
/*    */   }
/*    */ 
/*    */   
/*    */   public byte[] getSource() {
/* 22 */     return this.source;
/*    */   }
/*    */ 
/*    */   
/*    */   public void accept(MimeMessageAttachmentVisitor visitor) throws MessagingException {
/* 27 */     visitor.visit(this);
/*    */   }
/*    */ }


/* Location:              C:\spo\workspace\.metadata\.plugins\org.eclipse.wst.server.core\tmp0\wtpwebapps\sra\WEB-INF\classes\!\core\mail\mime\attachment\ByteArrayMimeMessageAttachment.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version:       1.1.3
 */