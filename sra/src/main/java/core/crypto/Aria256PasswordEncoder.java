/*    */ package core.crypto;
/*    */ 
/*    */ import egovframework.rte.fdl.cryptography.EgovARIACryptoService;
/*    */ import org.springframework.security.crypto.password.PasswordEncoder;
/*    */ 
/*    */ public class Aria256PasswordEncoder
/*    */   implements PasswordEncoder
/*    */ {
/*    */   private String hashedPassword;
/*    */   private final EgovARIACryptoService egovARIACryptoService;
/*    */   
/*    */   public Aria256PasswordEncoder(EgovARIACryptoService encoder) {
/* 13 */     this.egovARIACryptoService = encoder;
/*    */   }
/*    */   
/*    */   public void setHashedPassword(String hashedPassword) {
/* 17 */     this.hashedPassword = hashedPassword;
/*    */   }
/*    */ 
/*    */   
/*    */   public String encode(CharSequence rawPassword) {
/* 22 */     byte[] encodedPassword = this.egovARIACryptoService.encrypt(rawPassword.toString().getBytes(), this.hashedPassword);
/* 23 */     return new String(encodedPassword);
/*    */   }
/*    */ 
/*    */   
/*    */   public boolean matches(CharSequence rawPassword, String encodedPassword) {
/* 28 */     byte[] decodedPassword = this.egovARIACryptoService.decrypt(encodedPassword.getBytes(), this.hashedPassword);
/* 29 */     return (new String(decodedPassword)).equals(rawPassword.toString());
/*    */   }
/*    */ }


/* Location:              C:\spo\workspace\.metadata\.plugins\org.eclipse.wst.server.core\tmp0\wtpwebapps\sra\WEB-INF\classes\!\core\crypto\Aria256PasswordEncoder.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version:       1.1.3
 */