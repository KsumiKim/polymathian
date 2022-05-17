package sra.system.service;

import java.util.List;

import sra.system.model.MenuInVo;
import sra.system.model.MenuOutVo;

public interface MenuService {
  List<MenuOutVo> selectMainMenu();

  List<MenuOutVo> selectSubMenu(MenuInVo paramMenuInVo);
}


/* Location:              C:\spo\workspace\.metadata\.plugins\org.eclipse.wst.server.core\tmp0\wtpwebapps\sra\WEB-INF\classes\!\sra\system2\menu\sevice\MenuService.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version:       1.1.3
 */