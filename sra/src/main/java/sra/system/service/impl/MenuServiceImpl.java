/*    */ package sra.system.service.impl;
/*    */
/*    */ import java.util.List;

/*    */ import javax.annotation.Resource;

/*    */ import org.springframework.stereotype.Service;

/*    */ import sra.common.service.BaseService;
import sra.system.model.MenuInVo;
import sra.system.model.MenuOutVo;
import sra.system.service.MenuService;
import sra.system.service.dao.MenuMapperDao;
/*    */
/*    */
/*    */
/*    */
/*    */
/*    */
/*    */ @Service("menuService")
/*    */ public class MenuServiceImpl
/*    */   extends BaseService
/*    */   implements MenuService
/*    */ {
/*    */   @Resource(name = "menuMapperDao")
/*    */   private MenuMapperDao menuMapperDao;
/*    */
/*    */   public List<MenuOutVo> selectMainMenu() {
/* 26 */     return this.menuMapperDao.selectMainMenu();
/*    */   }
/*    */
/*    */
/*    */   public List<MenuOutVo> selectSubMenu(MenuInVo param) {
/* 31 */     return this.menuMapperDao.selectSubMenu(param);
/*    */   }
/*    */ }


/* Location:              C:\spo\workspace\.metadata\.plugins\org.eclipse.wst.server.core\tmp0\wtpwebapps\sra\WEB-INF\classes\!\sra\system2\menu\sevice\impl\MenuServiceImpl.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version:       1.1.3
 */