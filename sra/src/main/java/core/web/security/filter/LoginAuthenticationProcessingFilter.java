/*    */ package core.web.security.filter;
/*    */ 
/*    */ import core.model.VMap;
/*    */ import core.web.security.model.GuestAuthentication;
/*    */ import core.web.support.RequestBodyProcessor;
/*    */ import java.io.IOException;
/*    */ import javax.servlet.ServletException;
/*    */ import javax.servlet.http.HttpServletRequest;
/*    */ import javax.servlet.http.HttpServletResponse;
/*    */ import org.springframework.beans.factory.annotation.Value;
/*    */ import org.springframework.security.core.Authentication;
/*    */ import org.springframework.security.core.AuthenticationException;
/*    */ import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
/*    */ import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
/*    */ import org.springframework.security.web.util.matcher.RequestMatcher;
/*    */ 
/*    */ public class LoginAuthenticationProcessingFilter
/*    */   extends AbstractAuthenticationProcessingFilter
/*    */ {
/*    */   @Value("${spring.security.login-parameter.username}")
/*    */   private String LOGIN_PARAMETER_USERID;
/*    */   @Value("${spring.security.login-parameter.password}")
/*    */   private String LOGIN_PARAMETER_PASSWORD;
/*    */   private RequestBodyProcessor requestBodyProcessor;
/*    */   
/*    */   public void setRequestBodyProcessor(RequestBodyProcessor requestBodyProcessor) {
/* 27 */     this.requestBodyProcessor = requestBodyProcessor;
/*    */   }
/*    */   
/*    */   protected LoginAuthenticationProcessingFilter(String loginUrl) {
/* 31 */     super((RequestMatcher)new AntPathRequestMatcher(loginUrl));
/*    */   }
/*    */ 
/*    */   
/*    */   public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException, IOException, ServletException {
/* 36 */     VMap user = (VMap)this.requestBodyProcessor.read(request, request.getContentType(), VMap.class);
/* 37 */     String userId = user.getString(this.LOGIN_PARAMETER_USERID);
/* 38 */     String password = user.getString(this.LOGIN_PARAMETER_PASSWORD);
/* 39 */     return getAuthenticationManager().authenticate((Authentication)new GuestAuthentication(userId, password));
/*    */   }
/*    */ }


/* Location:              C:\spo\workspace\.metadata\.plugins\org.eclipse.wst.server.core\tmp0\wtpwebapps\sra\WEB-INF\classes\!\core\web\security\filter\LoginAuthenticationProcessingFilter.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version:       1.1.3
 */