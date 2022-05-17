/*    */ package core.mail.mime;
/*    */
/*    */ import java.io.File;
/*    */ import javax.mail.MessagingException;
/*    */ import javax.mail.internet.MimeMessage;
/*    */ import org.springframework.mail.javamail.MimeMessageHelper;
/*    */
/*    */
/*    */ public class SimpleMimeMessageBuilderImpl
/*    */   implements SimpleMimeMessageBuilder, MimeMessageBuilderFinisher
/*    */ {
/*    */   private final MimeMessageHelper mimeMessageHelper;
/*    */   private String from;
/*    */   private String[] to;
/*    */   private String[] cc;
/*    */   private String[] bcc;
/*    */   private String subject;
/*    */   private String text;
/*    */   private boolean html;
/*    */   private String fileName;
/*    */   private File file;
/*    */
/*    */   private SimpleMimeMessageBuilderImpl(MimeMessageHelper mimeMessageHelper) throws MessagingException {
/* 24 */     this.mimeMessageHelper = mimeMessageHelper;
/*    */   }
/*    */
/*    */
/*    */   public SimpleMimeMessageBuilder from(String from) throws MessagingException {
/* 29 */     this.from = from;
/* 30 */     return this;
/*    */   }
/*    */
/*    */
/*    */   public SimpleMimeMessageBuilder to(String... to) throws MessagingException {
/* 35 */     this.to = to;
/* 36 */     return this;
/*    */   }
/*    */
/*    */
/*    */   public SimpleMimeMessageBuilder cc(String... cc) throws MessagingException {
/* 41 */     this.cc = cc;
/* 42 */     return this;
/*    */   }
/*    */
/*    */
/*    */   public SimpleMimeMessageBuilder bcc(String... bcc) throws MessagingException {
/* 47 */     this.bcc = bcc;
/* 48 */     return this;
/*    */   }
/*    */
/*    */
/*    */   public SimpleMimeMessageBuilder subject(String subject) throws MessagingException {
/* 53 */     this.subject = subject;
/* 54 */     return this;
/*    */   }
/*    */
/*    */
/*    */   public SimpleMimeMessageBuilder text(String text, boolean html) throws MessagingException {
/* 59 */     this.text = text;
/* 60 */     this.html = html;
/* 61 */     return this;
/*    */   }
/*    */
/*    */
/*    */   public MimeMessage build() throws MessagingException {
/* 66 */     if (this.from != null) {
/* 67 */       this.mimeMessageHelper.setFrom(this.from);
/*    */     }
/*    */
/* 70 */     if (this.to != null) {
/* 71 */       this.mimeMessageHelper.setTo(this.to);
/*    */     }
/*    */
/* 74 */     if (this.cc != null) {
/* 75 */       this.mimeMessageHelper.setCc(this.cc);
/*    */     }
/*    */
/* 78 */     if (this.bcc != null) {
/* 79 */       this.mimeMessageHelper.setBcc(this.bcc);
/*    */     }
/*    */
/* 82 */     if (this.subject != null) {
/* 83 */       this.mimeMessageHelper.setSubject(this.subject);
/*    */     }
/*    */
/* 86 */     if (this.text != null) {
/* 87 */       this.mimeMessageHelper.setText(this.text, this.html);
/*    */     }
/*    */
/* 90 */     if (this.fileName != null && this.file != null) {
/* 91 */       this.mimeMessageHelper.addAttachment(this.fileName, this.file);
/*    */     }
/* 93 */     return this.mimeMessageHelper.getMimeMessage();
/*    */   }
/*    */
/*    */   public static SimpleMimeMessageBuilderImpl mimeMessage(MimeMessage mimeMessage) throws MessagingException {
/* 97 */     return new SimpleMimeMessageBuilderImpl(new MimeMessageHelper(mimeMessage, false));
/*    */   }
/*    */ }
