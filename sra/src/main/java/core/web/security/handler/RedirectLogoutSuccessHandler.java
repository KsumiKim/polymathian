/*    */ package core.web.security.handler;
/*    */ 
/*    */ import java.io.IOException;
/*    */ import javax.servlet.ServletException;
/*    */ import javax.servlet.http.HttpServletRequest;
/*    */ import javax.servlet.http.HttpServletResponse;
/*    */ import org.springframework.security.core.Authentication;
/*    */ import org.springframework.security.web.authentication.logout.SimpleUrlLogoutSuccessHandler;
/*    */ 
/*    */ 
/*    */ public class RedirectLogoutSuccessHandler
/*    */   extends SimpleUrlLogoutSuccessHandler
/*    */ {
/*    */   public void setLogoutSuccessProceedHandler(LogoutSuccessProceedHandler logoutSuccessProceedHandler) {
/* 15 */     this.logoutSuccessProceedHandler = logoutSuccessProceedHandler;
/*    */   }
/*    */ 
/*    */   
/*    */   public void onLogoutSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
/* 20 */     if (this.logoutSuccessProceedHandler != null) {
/* 21 */       this.logoutSuccessProceedHandler.onLogout(request, authentication);
/*    */     }
/* 23 */     super.onLogoutSuccess(request, response, authentication);
/*    */   }
/*    */   
/*    */   private LogoutSuccessProceedHandler logoutSuccessProceedHandler = (request, authentication) -> {
/*    */     
/*    */     };
/*    */ }


/* Location:              C:\spo\workspace\.metadata\.plugins\org.eclipse.wst.server.core\tmp0\wtpwebapps\sra\WEB-INF\classes\!\core\web\security\handler\RedirectLogoutSuccessHandler.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version:       1.1.3
 */