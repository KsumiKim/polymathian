/*    */ package core.support;
/*    */ 
/*    */ import java.util.Collection;
/*    */ import org.springframework.util.MimeType;
/*    */ 
/*    */ public class MediaTypeHelper
/*    */ {
/*    */   public static boolean isPresentIn(MimeType type, Collection<? extends MimeType> mimeTypes) {
/*  9 */     for (MimeType mimeType : mimeTypes) {
/* 10 */       if (mimeType.equals(type)) {
/* 11 */         return true;
/*    */       }
/*    */     } 
/* 14 */     return false;
/*    */   }
/*    */   
/*    */   public static boolean equalsTypeAndSubtype(MimeType mimeType, MimeType other) {
/* 18 */     if (other == null) {
/* 19 */       return false;
/*    */     }
/* 21 */     return (mimeType.getType().equalsIgnoreCase(other.getType()) && mimeType.getSubtype().equalsIgnoreCase(other.getSubtype()));
/*    */   }
/*    */ }


/* Location:              C:\spo\workspace\.metadata\.plugins\org.eclipse.wst.server.core\tmp0\wtpwebapps\sra\WEB-INF\classes\!\core\support\MediaTypeHelper.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version:       1.1.3
 */