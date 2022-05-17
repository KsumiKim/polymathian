/*    */ package core.web.security.model;
/*    */ 
/*    */ import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
/*    */ 
/*    */ public class GuestAuthentication extends UsernamePasswordAuthenticationToken {
/*    */   private static final long serialVersionUID = -5443376058508635655L;
/*    */   
/*    */   public GuestAuthentication(String userId, String password) {
/*  9 */     super(userId, password);
/*    */   }
/*    */   
/*    */   public String getUserId() {
/* 13 */     return (String)getPrincipal();
/*    */   }
/*    */   
/*    */   public String getPassword() {
/* 17 */     return (String)getCredentials();
/*    */   }
/*    */ }


/* Location:              C:\spo\workspace\.metadata\.plugins\org.eclipse.wst.server.core\tmp0\wtpwebapps\sra\WEB-INF\classes\!\core\web\security\model\GuestAuthentication.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version:       1.1.3
 */