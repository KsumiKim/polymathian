/*    */ package core.web.security.handler;
/*    */ 
/*    */ import java.io.IOException;
/*    */ import javax.servlet.ServletException;
/*    */ import javax.servlet.http.HttpServletRequest;
/*    */ import javax.servlet.http.HttpServletResponse;
/*    */ import org.springframework.security.core.AuthenticationException;
/*    */ import org.springframework.security.web.authentication.LoginUrlAuthenticationEntryPoint;
/*    */ import org.springframework.web.servlet.HandlerExceptionResolver;
/*    */ import org.springframework.web.servlet.ModelAndView;
/*    */ 
/*    */ public class DelegatingHandlerExceptionResolverAuthenticationEntryPoint
/*    */   extends LoginUrlAuthenticationEntryPoint
/*    */ {
/*    */   private HandlerExceptionResolver delegate;
/*    */   
/*    */   public DelegatingHandlerExceptionResolverAuthenticationEntryPoint(String loginFormUrl, HandlerExceptionResolver delegate) {
/* 18 */     super(loginFormUrl);
/* 19 */     this.delegate = delegate;
/*    */   }
/*    */ 
/*    */   
/*    */   public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {
/* 24 */     ModelAndView mv = this.delegate.resolveException(request, response, null, (Exception)exception);
/* 25 */     if (!mv.isEmpty())
/* 26 */       super.commence(request, response, exception); 
/*    */   }
/*    */ }


/* Location:              C:\spo\workspace\.metadata\.plugins\org.eclipse.wst.server.core\tmp0\wtpwebapps\sra\WEB-INF\classes\!\core\web\security\handler\DelegatingHandlerExceptionResolverAuthenticationEntryPoint.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version:       1.1.3
 */