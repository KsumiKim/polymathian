/*    */ package core.web.exception;
/*    */ 
/*    */ import org.springframework.http.HttpStatus;
/*    */ 
/*    */ public interface HttpErrorResponseTranslator {
/*    */   boolean supports(Class<?> paramClass);
/*    */   
/*    */   HttpStatus getStatus();
/*    */   
/*    */   String type(Exception paramException);
/*    */   
/*    */   default boolean unknown() {
/* 13 */     return true;
/*    */   }
/*    */   
/*    */   String viewName();
/*    */   
/*    */   String translateMessage(Exception paramException);
/*    */ }


/* Location:              C:\spo\workspace\.metadata\.plugins\org.eclipse.wst.server.core\tmp0\wtpwebapps\sra\WEB-INF\classes\!\core\web\exception\HttpErrorResponseTranslator.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version:       1.1.3
 */