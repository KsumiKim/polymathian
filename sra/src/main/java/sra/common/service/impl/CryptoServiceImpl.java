/*    */ package sra.common.service.impl;
/*    */ 
/*    */ import egovframework.rte.fdl.cryptography.EgovPasswordEncoder;
/*    */ import egovframework.rte.fdl.cryptography.impl.EgovARIACryptoServiceImpl;
/*    */ import java.io.UnsupportedEncodingException;
/*    */ import javax.annotation.Resource;
/*    */ import org.apache.commons.codec.binary.Base64;
/*    */ import org.slf4j.Logger;
/*    */ import org.slf4j.LoggerFactory;
/*    */ import org.springframework.security.crypto.password.PasswordEncoder;
/*    */ import org.springframework.stereotype.Service;
/*    */ import sra.common.service.BaseService;
/*    */ import sra.common.service.CryptoService;
/*    */ 
/*    */ @Service("CryptoService")
/*    */ public class CryptoServiceImpl
/*    */   extends BaseService implements CryptoService {
/* 18 */   private static final Logger log = LoggerFactory.getLogger(CryptoServiceImpl.class);
/*    */ 
/*    */ 
/*    */   
/* 22 */   private String PASSWORD = "egovframe";
/*    */ 
/*    */   
/*    */   @Resource(name = "egovARIACryptoServiceImpl")
/*    */   private EgovARIACryptoServiceImpl cryptoService;
/*    */ 
/*    */   
/*    */   @Resource(name = "sha256EgovPasswordEncoder")
/*    */   private EgovPasswordEncoder sha256EgovPasswordEncoder;
/*    */ 
/*    */   
/*    */   @Resource(name = "sha512EgovPasswordEncoder")
/*    */   private EgovPasswordEncoder sha512EgovPasswordEncoder;
/*    */ 
/*    */   
/*    */   @Resource(name = "aria256PasswordEncoder")
/*    */   private PasswordEncoder aria256PasswordEncoder;
/*    */ 
/*    */   
/*    */   public String enCrypt(String rowData) throws UnsupportedEncodingException {
/* 42 */     byte[] encrypted = this.cryptoService.encrypt(rowData.getBytes("UTF-8"), this.PASSWORD);
/*    */     
/* 44 */     return Base64.encodeBase64String(encrypted);
/*    */   }
/*    */ 
/*    */ 
/*    */ 
/*    */ 
/*    */ 
/*    */   
/*    */   public String deCrypt(String enCryptedData) throws UnsupportedEncodingException {
/* 53 */     byte[] decryptedData = this.cryptoService.decrypt(Base64.decodeBase64(enCryptedData), this.PASSWORD);
/*    */     
/* 55 */     return new String(decryptedData, "UTF-8");
/*    */   }
/*    */ 
/*    */ 
/*    */ 
/*    */ 
/*    */ 
/*    */ 
/*    */   
/*    */   public String encryptPasswordSha256(String plainPassword) throws UnsupportedEncodingException {
/* 65 */     String enCryptedPassword = this.sha256EgovPasswordEncoder.encryptPassword(plainPassword);
/*    */     
/* 67 */     return enCryptedPassword;
/*    */   }
/*    */ 
/*    */ 
/*    */ 
/*    */ 
/*    */ 
/*    */ 
/*    */   
/*    */   public String encryptPasswordSha512(String plainPassword) throws UnsupportedEncodingException {
/* 77 */     String enCryptedPassword = this.sha512EgovPasswordEncoder.encryptPassword(plainPassword);
/*    */     
/* 79 */     return enCryptedPassword;
/*    */   }
/*    */ 
/*    */ 
/*    */ 
/*    */ 
/*    */ 
/*    */ 
/*    */   
/*    */   public String encryptPasswordBcrypt(CharSequence rawPassword) throws UnsupportedEncodingException {
/* 89 */     String enCryptedPassword = this.aria256PasswordEncoder.encode(rawPassword.toString());
/*    */     
/* 91 */     return Base64.encodeBase64String(enCryptedPassword.getBytes("UTF-8"));
/*    */   }
/*    */ }


/* Location:              C:\spo\workspace\.metadata\.plugins\org.eclipse.wst.server.core\tmp0\wtpwebapps\sra\WEB-INF\classes\!\sra\common\service\impl\CryptoServiceImpl.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version:       1.1.3
 */