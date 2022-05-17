/*    */ package core.web.security.handler;
/*    */ 
/*    */ import java.io.IOException;
/*    */ import javax.servlet.ServletException;
/*    */ import javax.servlet.http.HttpServletRequest;
/*    */ import javax.servlet.http.HttpServletResponse;
/*    */ import org.springframework.security.core.AuthenticationException;
/*    */ import org.springframework.security.web.authentication.AuthenticationFailureHandler;
/*    */ import org.springframework.web.servlet.HandlerExceptionResolver;
/*    */ 
/*    */ public class DelegatingHandlerExceptionResolverAuthenticationFailureHandler
/*    */   implements AuthenticationFailureHandler {
/*    */   private HandlerExceptionResolver delegateHandlerExceptionResolver;
/*    */   
/*    */   public void setDelegateHandlerExceptionResolver(HandlerExceptionResolver delegateHandlerExceptionResolver) {
/* 16 */     this.delegateHandlerExceptionResolver = delegateHandlerExceptionResolver;
/*    */   }
/*    */ 
/*    */   
/*    */   public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {
/* 21 */     this.delegateHandlerExceptionResolver.resolveException(request, response, null, (Exception)exception);
/*    */   }
/*    */ }


/* Location:              C:\spo\workspace\.metadata\.plugins\org.eclipse.wst.server.core\tmp0\wtpwebapps\sra\WEB-INF\classes\!\core\web\security\handler\DelegatingHandlerExceptionResolverAuthenticationFailureHandler.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version:       1.1.3
 */