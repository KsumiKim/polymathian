/*    */ package core.support;
/*    */ 
/*    */ import javax.annotation.Resource;
/*    */ import org.springframework.jdbc.datasource.DataSourceTransactionManager;
/*    */ import org.springframework.transaction.TransactionDefinition;
/*    */ import org.springframework.transaction.TransactionStatus;
/*    */ import org.springframework.transaction.support.DefaultTransactionDefinition;
/*    */ 
/*    */ 
/*    */ public class SraTransactionManager
/*    */   extends DefaultTransactionDefinition
/*    */ {
/*    */   private static final long serialVersionUID = 1L;
/*    */   @Resource(name = "transactionManager")
/*    */   protected DataSourceTransactionManager tranManager;
/*    */   private transient TransactionStatus status;
/*    */   
/*    */   public void start() {
/* 19 */     this.status = this.tranManager.getTransaction((TransactionDefinition)this);
/*    */   }
/*    */   
/*    */   public void commit() {
/* 23 */     if (!this.status.isCompleted()) {
/* 24 */       this.tranManager.commit(this.status);
/*    */     }
/*    */   }
/*    */   
/*    */   public void rollback() {
/* 29 */     if (!this.status.isCompleted()) {
/* 30 */       this.tranManager.rollback(this.status);
/*    */     }
/*    */   }
/*    */   
/*    */   public void end() {
/* 35 */     rollback();
/*    */   }
/*    */ }


/* Location:              C:\spo\workspace\.metadata\.plugins\org.eclipse.wst.server.core\tmp0\wtpwebapps\sra\WEB-INF\classes\!\core\support\SraTransactionManager.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version:       1.1.3
 */