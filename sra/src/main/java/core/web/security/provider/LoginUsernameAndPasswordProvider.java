/*    */ package core.web.security.provider;
/*    */
/*    */ import core.web.security.model.AuthorizedAuthentication;
/*    */ import core.web.security.model.AuthorizedDetails;
/*    */ import core.web.security.model.GuestAuthentication;
/*    */ import org.springframework.security.access.AccessDeniedException;
/*    */ import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
/*    */ import org.springframework.security.core.Authentication;
/*    */
/*    */
/*    */
/*    */
/*    */
/*    */ public class LoginUsernameAndPasswordProvider
/*    */   extends DaoAuthenticationProvider
/*    */ {
/*    */   public boolean supports(Class<?> authentication) {
/* 18 */     return GuestAuthentication.class.isAssignableFrom(authentication);
/*    */   }
/*    */
/*    */
/*    */   public Authentication authenticate(Authentication authentication) {
/* 23 */     Authentication user = super.authenticate(authentication);
/* 24 */     Object details = user.getPrincipal();
/* 25 */     if (details instanceof AuthorizedDetails) {
/* 26 */       AuthorizedDetails authDetails = (AuthorizedDetails)details;
/* 27 */       AuthorizedAuthentication auth = new AuthorizedAuthentication(authDetails);
/* 28 */       auth.setAuthenticated(true);
/* 29 */       return (Authentication)auth;
/*    */     }
/* 31 */     throw new AccessDeniedException("Login Processing error.");
/*    */   }
/*    */ }
