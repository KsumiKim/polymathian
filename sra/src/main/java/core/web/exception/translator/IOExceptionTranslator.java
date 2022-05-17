/*    */ package core.web.exception.translator;
/*    */ 
/*    */ import java.io.IOException;
/*    */ import org.springframework.context.MessageSource;
/*    */ import org.springframework.http.HttpStatus;
/*    */ 
/*    */ 
/*    */ 
/*    */ public class IOExceptionTranslator
/*    */   extends AbstractTypedHttpErrorResponseTranslator<IOException>
/*    */ {
/*    */   public boolean supports(Class<?> exception) {
/* 13 */     return IOException.class.isAssignableFrom(exception);
/*    */   }
/*    */ 
/*    */   
/*    */   public HttpStatus getStatus() {
/* 18 */     return HttpStatus.INTERNAL_SERVER_ERROR;
/*    */   }
/*    */ 
/*    */   
/*    */   protected String doTranslateMessage(IOException exception, MessageSource messageSource) {
/* 23 */     if (exception instanceof java.nio.file.NoSuchFileException || exception instanceof java.io.FileNotFoundException) {
/* 24 */       return "파일을 찾을 수 없습니다.";
/*    */     }
/* 26 */     return "시스템 오류가 발생하였습니다.";
/*    */   }
/*    */ }


/* Location:              C:\spo\workspace\.metadata\.plugins\org.eclipse.wst.server.core\tmp0\wtpwebapps\sra\WEB-INF\classes\!\core\web\exception\translator\IOExceptionTranslator.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version:       1.1.3
 */