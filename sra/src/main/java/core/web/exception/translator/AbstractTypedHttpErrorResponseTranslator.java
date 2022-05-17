/*    */ package core.web.exception.translator;
/*    */ 
/*    */ import core.web.exception.HttpErrorResponseTranslator;
/*    */ import org.springframework.context.MessageSource;
/*    */ 
/*    */ public abstract class AbstractTypedHttpErrorResponseTranslator<T extends Exception>
/*    */   implements HttpErrorResponseTranslator {
/*    */   private MessageSource messageSource;
/*    */   
/*    */   public void setMessageSource(MessageSource messageSource) {
/* 11 */     this.messageSource = messageSource;
/*    */   }
/*    */ 
/*    */   
/*    */   public String type(Exception exception) {
/* 16 */     return exception.getClass().getSimpleName();
/*    */   }
/*    */ 
/*    */   
/*    */   public String viewName() {
/* 21 */     return "error";
/*    */   }
/*    */ 
/*    */ 
/*    */   
/*    */   public String translateMessage(Exception exception) {
/* 27 */     return doTranslateMessage((T)exception, this.messageSource);
/*    */   }
/*    */   
/*    */   protected abstract String doTranslateMessage(T paramT, MessageSource paramMessageSource);
/*    */ }


/* Location:              C:\spo\workspace\.metadata\.plugins\org.eclipse.wst.server.core\tmp0\wtpwebapps\sra\WEB-INF\classes\!\core\web\exception\translator\AbstractTypedHttpErrorResponseTranslator.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version:       1.1.3
 */