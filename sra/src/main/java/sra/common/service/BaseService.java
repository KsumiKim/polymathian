/*    */ package sra.common.service;
/*    */ 
/*    */ import egovframework.rte.fdl.cmmn.exception.EgovBizException;
/*    */ import org.slf4j.Logger;
/*    */ import org.slf4j.LoggerFactory;
/*    */ 
/*    */ public class BaseService
/*    */ {
/*  9 */   protected Logger log = LoggerFactory.getLogger(getClass());
/*    */   
/*    */   protected EgovBizException proccessException(String message, Object... args) {
/* 12 */     return new EgovBizException(message, args, null);
/*    */   }
/*    */ }


/* Location:              C:\spo\workspace\.metadata\.plugins\org.eclipse.wst.server.core\tmp0\wtpwebapps\sra\WEB-INF\classes\!\sra\common\service\BaseService.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version:       1.1.3
 */