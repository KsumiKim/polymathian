/*    */ package core.web.exception.translator;
/*    */ 
/*    */ import org.springframework.context.MessageSource;
/*    */ import org.springframework.http.HttpStatus;
/*    */ 
/*    */ public class JavaExceptionTranslator
/*    */   extends AbstractTypedHttpErrorResponseTranslator<Exception> {
/*    */   public boolean supports(Class<?> exception) {
/*  9 */     return true;
/*    */   }
/*    */ 
/*    */   
/*    */   public HttpStatus getStatus() {
/* 14 */     return HttpStatus.INTERNAL_SERVER_ERROR;
/*    */   }
/*    */ 
/*    */ 
/*    */   
/*    */   protected String doTranslateMessage(Exception exception, MessageSource messageSource) {
/* 20 */     return exception.getMessage();
/*    */   }
/*    */ }


/* Location:              C:\spo\workspace\.metadata\.plugins\org.eclipse.wst.server.core\tmp0\wtpwebapps\sra\WEB-INF\classes\!\core\web\exception\translator\JavaExceptionTranslator.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version:       1.1.3
 */