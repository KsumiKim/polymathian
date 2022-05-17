/*    */ package core.web.security.handler;
/*    */ 
/*    */ import core.model.VMap;
/*    */ import core.support.MediaTypeHelper;
/*    */ import core.web.support.ResponseBodyProcessor;
/*    */ import java.io.IOException;
/*    */ import javax.servlet.ServletException;
/*    */ import javax.servlet.http.HttpServletRequest;
/*    */ import javax.servlet.http.HttpServletResponse;
/*    */ import org.springframework.http.HttpStatus;
/*    */ import org.springframework.http.MediaType;
/*    */ import org.springframework.security.core.Authentication;
/*    */ import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
/*    */ import org.springframework.util.MimeType;
/*    */ 
/*    */ public class LoginAuthenticationSuccessHandler extends SavedRequestAwareAuthenticationSuccessHandler {
/*    */   private ResponseBodyProcessor responseBodyProcessor;
/*    */   private LoginSuccessProceedHandler loginSuccessProceedHandler;
/*    */   
/*    */   public void setResponseBodyProcessor(ResponseBodyProcessor responseBodyProcessor) {
/* 21 */     this.responseBodyProcessor = responseBodyProcessor;
/*    */   }
/*    */   public void setLoginSuccessProceedHandler(LoginSuccessProceedHandler loginSuccessProceedHandler) {
/* 24 */     this.loginSuccessProceedHandler = loginSuccessProceedHandler;
/*    */   }
/*    */ 
/*    */   
/*    */   public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws ServletException, IOException {
/* 29 */     if (this.loginSuccessProceedHandler != null) {
/* 30 */       this.loginSuccessProceedHandler.onLogin(request, authentication);
/*    */     }
/* 32 */     String accept = request.getHeader("Accept");
/* 33 */     if (MediaTypeHelper.isPresentIn((MimeType)MediaType.TEXT_HTML, MediaType.parseMediaTypes(accept))) {
/* 34 */       super.onAuthenticationSuccess(request, response, authentication);
/*    */     } else {
/* 36 */       VMap returnValue = new VMap();
/* 37 */       returnValue.put("redirectUrl", getDefaultTargetUrl());
/* 38 */       this.responseBodyProcessor.write(response, HttpStatus.OK.value(), accept, returnValue);
/*    */     } 
/*    */   }
/*    */ }


/* Location:              C:\spo\workspace\.metadata\.plugins\org.eclipse.wst.server.core\tmp0\wtpwebapps\sra\WEB-INF\classes\!\core\web\security\handler\LoginAuthenticationSuccessHandler.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version:       1.1.3
 */