/*    */ package core.web.security.model;
/*    */ 
/*    */ import java.util.Collection;
/*    */ import org.springframework.security.core.Authentication;
/*    */ import org.springframework.security.core.GrantedAuthority;
/*    */ 
/*    */ public class PreparedAuthenticationToken
/*    */   implements Authentication
/*    */ {
/*    */   private static final long serialVersionUID = 4075279426298957765L;
/*    */   private String username;
/*    */   
/*    */   public PreparedAuthenticationToken(String username) {
/* 14 */     this.username = username;
/*    */   }
/*    */ 
/*    */   
/*    */   public String getName() {
/* 19 */     return this.username;
/*    */   }
/*    */ 
/*    */   
/*    */   public Collection<? extends GrantedAuthority> getAuthorities() {
/* 24 */     return null;
/*    */   }
/*    */ 
/*    */   
/*    */   public Object getPrincipal() {
/* 29 */     return this.username;
/*    */   }
/*    */ 
/*    */   
/*    */   public Object getCredentials() {
/* 34 */     return this.username;
/*    */   }
/*    */ 
/*    */   
/*    */   public Object getDetails() {
/* 39 */     return this.username;
/*    */   }
/*    */ 
/*    */   
/*    */   public boolean isAuthenticated() {
/* 44 */     return false;
/*    */   }
/*    */   
/*    */   public void setAuthenticated(boolean isAuthenticated) throws IllegalArgumentException {}
/*    */ }


/* Location:              C:\spo\workspace\.metadata\.plugins\org.eclipse.wst.server.core\tmp0\wtpwebapps\sra\WEB-INF\classes\!\core\web\security\model\PreparedAuthenticationToken.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version:       1.1.3
 */