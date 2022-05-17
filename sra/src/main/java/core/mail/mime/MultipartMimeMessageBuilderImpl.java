/*     */ package core.mail.mime;
/*     */
/*     */ import core.mail.mime.attachment.ByteArrayMimeMessageAttachment;
/*     */ import core.mail.mime.attachment.ComplexMimeMessageAttachmentVisitor;
/*     */ import core.mail.mime.attachment.FileMimeMessageAttachment;
/*     */ import core.mail.mime.attachment.MimeMessageAttachementAcceptor;
/*     */ import core.mail.mime.attachment.MimeMessageAttachmentVisitor;
/*     */ import core.mail.mime.attachment.PathMimeMessageAttachment;
/*     */ import core.support.FunctionHelper;
/*     */ import java.io.File;
/*     */ import java.nio.file.Path;
/*     */ import java.util.ArrayList;
/*     */ import java.util.List;
/*     */ import javax.mail.MessagingException;
/*     */ import javax.mail.internet.MimeMessage;
/*     */ import org.springframework.mail.javamail.MimeMessageHelper;
/*     */
/*     */
/*     */
/*     */
/*     */ public class MultipartMimeMessageBuilderImpl
/*     */   implements MultipartMimeMessageBuilder, MimeMessageBuilderFinisher
/*     */ {
/*     */   private final MimeMessageHelper mimeMessageHelper;
/*     */   private ComplexMimeMessageAttachmentVisitor mimeMessageAttachmentVisitor;
/*     */   private String from;
/*     */   private String[] to;
/*     */   private String[] cc;
/*     */   private String[] bcc;
/*     */   private String subject;
/*     */   private String text;
/*     */   private boolean html;
/*  33 */   private List<MimeMessageAttachementAcceptor> attachments = new ArrayList<>();
/*     */
/*     */   private MultipartMimeMessageBuilderImpl(MimeMessageHelper mimeMessageHelper) throws MessagingException {
/*  36 */     this.mimeMessageHelper = mimeMessageHelper;
/*  37 */     this.mimeMessageAttachmentVisitor = new ComplexMimeMessageAttachmentVisitor(mimeMessageHelper);
/*     */   }
/*     */
/*     */
/*     */   public MultipartMimeMessageBuilder from(String from) throws MessagingException {
/*  42 */     this.from = from;
/*  43 */     return this;
/*     */   }
/*     */
/*     */
/*     */   public MultipartMimeMessageBuilder to(String... to) throws MessagingException {
/*  48 */     this.to = to;
/*  49 */     return this;
/*     */   }
/*     */
/*     */
/*     */   public MultipartMimeMessageBuilder cc(String... cc) throws MessagingException {
/*  54 */     this.cc = cc;
/*  55 */     return this;
/*     */   }
/*     */
/*     */
/*     */   public MultipartMimeMessageBuilder bcc(String... bcc) throws MessagingException {
/*  60 */     this.bcc = bcc;
/*  61 */     return this;
/*     */   }
/*     */
/*     */
/*     */   public MultipartMimeMessageBuilder subject(String subject) throws MessagingException {
/*  66 */     this.subject = subject;
/*  67 */     return this;
/*     */   }
/*     */
/*     */
/*     */   public MultipartMimeMessageBuilder text(String text, boolean html) throws MessagingException {
/*  72 */     this.text = text;
/*  73 */     this.html = html;
/*  74 */     return this;
/*     */   }
/*     */
/*     */
/*     */   public MultipartMimeMessageBuilder addAttachment(String filename, File file) {
/*  79 */     this.attachments.add(new FileMimeMessageAttachment(filename, file));
/*  80 */     return this;
/*     */   }
/*     */
/*     */
/*     */   public MultipartMimeMessageBuilder addAttachment(String filename, Path path) {
/*  85 */     this.attachments.add(new PathMimeMessageAttachment(filename, path));
/*  86 */     return this;
/*     */   }
/*     */
/*     */
/*     */   public MultipartMimeMessageBuilder addAttachment(String filename, byte[] input) {
/*  91 */     this.attachments.add(new ByteArrayMimeMessageAttachment(filename, input));
/*  92 */     return this;
/*     */   }
/*     */
/*     */
/*     */   public MimeMessage build() throws MessagingException {
/*  97 */     if (this.from != null) {
/*  98 */       this.mimeMessageHelper.setFrom(this.from);
/*     */     }
/*     */
/* 101 */     if (this.to != null) {
/* 102 */       this.mimeMessageHelper.setTo(this.to);
/*     */     }
/*     */
/* 105 */     if (this.cc != null) {
/* 106 */       this.mimeMessageHelper.setCc(this.cc);
/*     */     }
/*     */
/* 109 */     if (this.bcc != null) {
/* 110 */       this.mimeMessageHelper.setBcc(this.bcc);
/*     */     }
/*     */
/* 113 */     if (this.subject != null) {
/* 114 */       this.mimeMessageHelper.setSubject(this.subject);
/*     */     }
/*     */
/* 117 */     if (this.text != null) {
/* 118 */       this.mimeMessageHelper.setText(this.text, this.html);
/*     */     }
/*     */
/* 121 */     this.attachments.forEach(FunctionHelper.exceptConsumer(acceptor -> acceptor.accept((MimeMessageAttachmentVisitor)this.mimeMessageAttachmentVisitor)));
/*     */
/*     */
/*     */
/*     */
/*     */
/*     */
/*     */
/*     */
/*     */
/*     */
/*     */
/*     */
/*     */
/*     */
/*     */
/*     */
/*     */
/*     */
/*     */
/*     */
/*     */
/*     */
/*     */
/*     */
/*     */
/*     */
/*     */
/* 149 */     return this.mimeMessageHelper.getMimeMessage();
/*     */   }
/*     */
/*     */   public static MultipartMimeMessageBuilderImpl mimeMessage(MimeMessage mimeMessage) throws MessagingException {
/* 153 */     return new MultipartMimeMessageBuilderImpl(new MimeMessageHelper(mimeMessage, true));
/*     */   }
/*     */ }