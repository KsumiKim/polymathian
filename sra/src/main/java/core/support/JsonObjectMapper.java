/*    */ package core.support;
/*    */ 
/*    */ import com.fasterxml.jackson.annotation.JsonInclude;
/*    */ import com.fasterxml.jackson.databind.DeserializationFeature;
/*    */ import com.fasterxml.jackson.databind.Module;
/*    */ import com.fasterxml.jackson.databind.ObjectMapper;
/*    */ import com.fasterxml.jackson.databind.SerializationFeature;
/*    */ import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
/*    */ 
/*    */ public class JsonObjectMapper
/*    */   extends ObjectMapper {
/*    */   public JsonObjectMapper() {
/* 13 */     configure(SerializationFeature.INDENT_OUTPUT, true);
/* 14 */     configure(DeserializationFeature.ACCEPT_EMPTY_STRING_AS_NULL_OBJECT, true);
/* 15 */     configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
/* 16 */     setSerializationInclusion(JsonInclude.Include.NON_NULL);
/* 17 */     enable(SerializationFeature.WRITE_ENUMS_USING_TO_STRING);
/* 18 */     registerModule((Module)new JavaTimeModule());
/*    */   }
/*    */   
/*    */   private static final long serialVersionUID = 3231902043912951840L;
/*    */ }


/* Location:              C:\spo\workspace\.metadata\.plugins\org.eclipse.wst.server.core\tmp0\wtpwebapps\sra\WEB-INF\classes\!\core\support\JsonObjectMapper.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version:       1.1.3
 */