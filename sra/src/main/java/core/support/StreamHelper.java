/*    */ package core.support;
/*    */ 
/*    */ import java.util.Enumeration;
/*    */ import java.util.Iterator;
/*    */ import java.util.NoSuchElementException;
/*    */ import java.util.Spliterators;
/*    */ import java.util.stream.Stream;
/*    */ import java.util.stream.StreamSupport;
/*    */ 
/*    */ public class StreamHelper
/*    */ {
/*    */   public static <T> Stream<T> of(final Enumeration<T> vector) {
/* 13 */     return of(new Iterator<T>() {
/*    */           public T next() {
/* 15 */             if (!hasNext()) {
/* 16 */               throw new NoSuchElementException();
/*    */             }
/* 18 */             return vector.nextElement();
/*    */           }
/*    */           
/*    */           public boolean hasNext() {
/* 22 */             return vector.hasMoreElements();
/*    */           }
/*    */         });
/*    */   }
/*    */   
/*    */   public static <T> Stream<T> of(Iterator<T> iterator) {
/* 28 */     return StreamSupport.stream(Spliterators.spliteratorUnknownSize(iterator, 16), false);
/*    */   }
/*    */ }


/* Location:              C:\spo\workspace\.metadata\.plugins\org.eclipse.wst.server.core\tmp0\wtpwebapps\sra\WEB-INF\classes\!\core\support\StreamHelper.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version:       1.1.3
 */