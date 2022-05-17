/*    */ package core.web.security.filter;
/*    */ 
/*    */ import core.web.security.model.PreparedAuthenticationToken;
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
/*    */ public class PermitAuthenticationProcessingFilter
/*    */   extends AbstractAuthenticationProcessingFilter
/*    */ {
/*    */   @Value("${spring.security.permit-parameter.username}")
/*    */   private String PERMIT_PARAMETER_USERID;
/*    */   
/*    */   protected PermitAuthenticationProcessingFilter(String loginUrl) {
/* 22 */     super((RequestMatcher)new AntPathRequestMatcher(loginUrl));
/*    */   }
/*    */ 
/*    */   
/*    */   public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException, IOException, ServletException {
/* 27 */     String userId = request.getParameter(this.PERMIT_PARAMETER_USERID);
/* 28 */     return getAuthenticationManager().authenticate((Authentication)new PreparedAuthenticationToken(userId));
/*    */   }
/*    */ }


/* Location:              C:\spo\workspace\.metadata\.plugins\org.eclipse.wst.server.core\tmp0\wtpwebapps\sra\WEB-INF\classes\!\core\web\security\filter\PermitAuthenticationProcessingFilter.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version:       1.1.3
 */