/*    */ package core.mail.mime.attachment;
/*    */ 
/*    */ import javax.mail.MessagingException;
/*    */ import org.springframework.core.io.ByteArrayResource;
/*    */ import org.springframework.core.io.InputStreamSource;
/*    */ import org.springframework.core.io.PathResource;
/*    */ import org.springframework.mail.javamail.MimeMessageHelper;
/*    */ 
/*    */ public class ComplexMimeMessageAttachmentVisitor implements MimeMessageAttachmentVisitor {
/*    */   private final MimeMessageHelper mimeMessageHelper;
/*    */   
/*    */   public ComplexMimeMessageAttachmentVisitor(MimeMessageHelper mimeMessageHelper) {
/* 13 */     this.mimeMessageHelper = mimeMessageHelper;
/*    */   }
/*    */ 
/*    */   
/*    */   public void visit(FileMimeMessageAttachment mimeMessageAttachment) throws MessagingException {
/* 18 */     this.mimeMessageHelper.addAttachment(mimeMessageAttachment.getFilename(), mimeMessageAttachment.getSource());
/*    */   }
/*    */ 
/*    */   
/*    */   public void visit(PathMimeMessageAttachment mimeMessageAttachment) throws MessagingException {
/* 23 */     this.mimeMessageHelper.addAttachment(mimeMessageAttachment.getFilename(), (InputStreamSource)new PathResource(mimeMessageAttachment.getSource()));
/*    */   }
/*    */ 
/*    */   
/*    */   public void visit(ByteArrayMimeMessageAttachment mimeMessageAttachment) throws MessagingException {
/* 28 */     this.mimeMessageHelper.addAttachment(mimeMessageAttachment.getFilename(), (InputStreamSource)new ByteArrayResource(mimeMessageAttachment.getSource()));
/*    */   }
/*    */ }


/* Location:              C:\spo\workspace\.metadata\.plugins\org.eclipse.wst.server.core\tmp0\wtpwebapps\sra\WEB-INF\classes\!\core\mail\mime\attachment\ComplexMimeMessageAttachmentVisitor.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version:       1.1.3
 */