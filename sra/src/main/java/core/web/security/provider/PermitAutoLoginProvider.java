/*    */ package core.web.security.provider;
/*    */
/*    */ import core.web.security.model.AuthorizedAuthentication;
/*    */ import core.web.security.model.AuthorizedDetails;
/*    */ import core.web.security.model.PreparedAuthenticationToken;
/*    */ import org.springframework.security.access.AccessDeniedException;
/*    */ import org.springframework.security.authentication.AuthenticationProvider;
/*    */ import org.springframework.security.core.Authentication;
/*    */ import org.springframework.security.core.AuthenticationException;
/*    */ import org.springframework.security.core.userdetails.UserDetails;
/*    */ import org.springframework.security.core.userdetails.UserDetailsService;
/*    */
/*    */ public class PermitAutoLoginProvider
/*    */   implements AuthenticationProvider {
/*    */   public void setUserDetailsService(UserDetailsService userDetailsService) {
/* 16 */     this.userDetailsService = userDetailsService;
/*    */   }
/*    */   private UserDetailsService userDetailsService;
/*    */
/*    */   public boolean supports(Class<?> authentication) {
/* 21 */     return PreparedAuthenticationToken.class.isAssignableFrom(authentication);
/*    */   }
/*    */
/*    */
/*    */   public Authentication authenticate(Authentication authentication) throws AuthenticationException {
/* 26 */     UserDetails authDetails = this.userDetailsService.loadUserByUsername(authentication.getName());
/* 27 */     if (authDetails instanceof AuthorizedDetails) {
/* 28 */       AuthorizedAuthentication auth = new AuthorizedAuthentication((AuthorizedDetails)authDetails);
/* 29 */       auth.setAuthenticated(true);
/* 30 */       return (Authentication)auth;
/*    */     }
/* 32 */     throw new AccessDeniedException("Login Processing error.");
/*    */   }
/*    */ }
