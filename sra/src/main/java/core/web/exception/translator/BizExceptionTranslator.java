/*    */ package core.web.exception.translator;
/*    */ 
/*    */ import egovframework.rte.fdl.cmmn.exception.EgovBizException;
/*    */ import org.springframework.context.MessageSource;
/*    */ import org.springframework.http.HttpStatus;
/*    */ 
/*    */ public class BizExceptionTranslator
/*    */   extends AbstractTypedHttpErrorResponseTranslator<EgovBizException>
/*    */ {
/*    */   public boolean supports(Class<?> exception) {
/* 11 */     return EgovBizException.class.isAssignableFrom(exception);
/*    */   }
/*    */ 
/*    */   
/*    */   public HttpStatus getStatus() {
/* 16 */     return HttpStatus.CONFLICT;
/*    */   }
/*    */ 
/*    */   
/*    */   public boolean unknown() {
/* 21 */     return false;
/*    */   }
/*    */ 
/*    */   
/*    */   protected String doTranslateMessage(EgovBizException exception, MessageSource messageSource) {
/* 26 */     return exception.getMessage();
/*    */   }
/*    */ }


/* Location:              C:\spo\workspace\.metadata\.plugins\org.eclipse.wst.server.core\tmp0\wtpwebapps\sra\WEB-INF\classes\!\core\web\exception\translator\BizExceptionTranslator.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version:       1.1.3
 */