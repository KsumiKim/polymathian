/*    */ package core.util;
/*    */ 
/*    */ import com.fasterxml.jackson.core.JsonProcessingException;
/*    */ import com.fasterxml.jackson.core.type.TypeReference;
/*    */ import com.fasterxml.jackson.databind.ObjectMapper;
/*    */ import core.support.JsonObjectMapper;
/*    */ 
/*    */ public class JsonUtil
/*    */ {
/* 10 */   private static ObjectMapper mapper = (ObjectMapper)new JsonObjectMapper();
/*    */   
/*    */   public static String toJson(Object value) {
/*    */     try {
/* 14 */       return mapper.writeValueAsString(value);
/* 15 */     } catch (JsonProcessingException e) {
/* 16 */       throw new Error(e);
/*    */     } 
/*    */   }
/*    */   
/*    */   public static <T> T toJava(String value, TypeReference<T> typeRef) {
/*    */     try {
/* 22 */       return (T)mapper.readValue(value, typeRef);
/* 23 */     } catch (Exception e) {
/* 24 */       throw new Error(e);
/*    */     } 
/*    */   }
/*    */   
/*    */   public static <T> T toJava(String value, Class<T> clazz) {
/*    */     try {
/* 30 */       return (T)mapper.readValue(value, clazz);
/* 31 */     } catch (Exception e) {
/* 32 */       throw new Error(e);
/*    */     } 
/*    */   }
/*    */   
/*    */   public static <T> T toJava(String value) {
/*    */     try {
/* 38 */       return (T)mapper.readValue(value, new TypeReference<T>() {  });
/* 39 */     } catch (Exception e) {
/* 40 */       throw new Error(e);
/*    */     } 
/*    */   }
/*    */   
/*    */   public static <T> T toJava(byte[] value) {
/*    */     try {
/* 46 */       return (T)mapper.readValue(value, new TypeReference<T>() {  });
/* 47 */     } catch (Exception e) {
/* 48 */       throw new Error(e);
/*    */     } 
/*    */   }
/*    */   
/*    */   public static <T> T toJava(byte[] value, Class<T> clazz) {
/*    */     try {
/* 54 */       return (T)mapper.readValue(value, clazz);
/* 55 */     } catch (Exception e) {
/* 56 */       throw new Error(e);
/*    */     } 
/*    */   }
/*    */ }


/* Location:              C:\spo\workspace\.metadata\.plugins\org.eclipse.wst.server.core\tmp0\wtpwebapps\sra\WEB-INF\classes\!\cor\\util\JsonUtil.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version:       1.1.3
 */