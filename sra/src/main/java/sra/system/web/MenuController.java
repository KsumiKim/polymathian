/*    */ package sra.system.web;
/*    */
/*    */ import java.util.List;

/*    */ import javax.annotation.Resource;

/*    */ import org.springframework.web.bind.annotation.PostMapping;
/*    */ import org.springframework.web.bind.annotation.RequestBody;
/*    */ import org.springframework.web.bind.annotation.RequestMapping;
/*    */ import org.springframework.web.bind.annotation.RestController;

import sra.system.model.MenuInVo;
import sra.system.model.MenuOutVo;
import sra.system.service.MenuService;
/*    */
/*    */
/*    */
/*    */
/*    */
/*    */
/*    */
/*    */
/*    */ @RestController
/*    */ @RequestMapping({"/system2/menu"})
/*    */ public class MenuController
/*    */ {
/*    */   @Resource(name = "menuService")
/*    */   private MenuService menuService;
/*    */
/*    */   @PostMapping({"/selectMainMenu"})
/*    */   public List<MenuOutVo> selectMainMenu() {
/* 29 */     return this.menuService.selectMainMenu();
/*    */   }
/*    */
/*    */
/*    */
/*    */
/*    */
/*    */
/*    */   @PostMapping({"/selectSubMenu"})
/*    */   public List<MenuOutVo> selectSubMenu(@RequestBody MenuInVo param) {
/* 39 */     return this.menuService.selectSubMenu(param);
/*    */   }
/*    */ }


/* Location:              C:\spo\workspace\.metadata\.plugins\org.eclipse.wst.server.core\tmp0\wtpwebapps\sra\WEB-INF\classes\!\sra\system2\menu\web\MenuController.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version:       1.1.3
 */