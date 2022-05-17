/*    */ package core.web.exception.translator;
/*    */ 
/*    */ import org.springframework.context.MessageSource;
/*    */ import org.springframework.http.HttpStatus;
/*    */ import org.springframework.security.core.AuthenticationException;
/*    */ 
/*    */ 
/*    */ 
/*    */ public class AuthenticationExceptionTranslator
/*    */   extends AbstractTypedHttpErrorResponseTranslator<AuthenticationException>
/*    */ {
/*    */   public boolean supports(Class<?> exception) {
/* 13 */     return AuthenticationException.class.isAssignableFrom(exception);
/*    */   }
/*    */ 
/*    */   
/*    */   public HttpStatus getStatus() {
/* 18 */     return HttpStatus.UNAUTHORIZED;
/*    */   }
/*    */ 
/*    */   
/*    */   protected String doTranslateMessage(AuthenticationException exception, MessageSource messageSource) {
/* 23 */     if (exception instanceof org.springframework.security.core.userdetails.UsernameNotFoundException)
/* 24 */       return "계정을 찾을 수 없습니다."; 
/* 25 */     if (exception instanceof org.springframework.security.authentication.BadCredentialsException)
/* 26 */       return "비밀번호가 일치하지 않습니다."; 
/* 27 */     if (exception instanceof org.springframework.security.authentication.InternalAuthenticationServiceException) {
/* 28 */       return "인증 처리과정에서 오류가 발생하였습니다.";
/*    */     }
/* 30 */     return "요청이 제한되었습니다.";
/*    */   }
/*    */ }


/* Location:              C:\spo\workspace\.metadata\.plugins\org.eclipse.wst.server.core\tmp0\wtpwebapps\sra\WEB-INF\classes\!\core\web\exception\translator\AuthenticationExceptionTranslator.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version:       1.1.3
 */