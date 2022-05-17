/*    */ package core.crypto;
/*    */ 
/*    */ import egovframework.rte.fdl.cryptography.EgovPasswordEncoder;
/*    */ import org.springframework.security.crypto.password.PasswordEncoder;
/*    */ 
/*    */ public class Sha256PasswordEncoder
/*    */   implements PasswordEncoder {
/*    */   private EgovPasswordEncoder egovPasswordEncoder;
/*    */   
/*    */   public Sha256PasswordEncoder(EgovPasswordEncoder encoder) {
/* 11 */     this.egovPasswordEncoder = encoder;
/*    */   }
/*    */ 
/*    */   
/*    */   public String encode(CharSequence rawPassword) {
/* 16 */     return this.egovPasswordEncoder.encryptPassword(rawPassword.toString());
/*    */   }
/*    */ 
/*    */   
/*    */   public boolean matches(CharSequence rawPassword, String encodedPassword) {
/* 21 */     return encodedPassword.equals(encode(rawPassword));
/*    */   }
/*    */ }


/* Location:              C:\spo\workspace\.metadata\.plugins\org.eclipse.wst.server.core\tmp0\wtpwebapps\sra\WEB-INF\classes\!\core\crypto\Sha256PasswordEncoder.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version:       1.1.3
 */