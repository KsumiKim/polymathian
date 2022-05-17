/*    */ package core.web.support;
/*    */ 
/*    */ import java.util.ArrayList;
/*    */ import java.util.List;
/*    */ import org.springframework.http.converter.HttpMessageConverter;
/*    */ 
/*    */ public class HttpMessageConverters
/*    */   extends ArrayList<HttpMessageConverter<?>> {
/*    */   private static final long serialVersionUID = -3519317192306043760L;
/*    */   
/*    */   public HttpMessageConverters(List<HttpMessageConverter<?>> converters) {
/* 12 */     super(converters);
/*    */   }
/*    */ }


/* Location:              C:\spo\workspace\.metadata\.plugins\org.eclipse.wst.server.core\tmp0\wtpwebapps\sra\WEB-INF\classes\!\core\web\support\HttpMessageConverters.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version:       1.1.3
 */