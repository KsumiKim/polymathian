package sra.system.service.dao;

import java.util.List;

import core.annotation.PrimaryMapperRepository;
import sra.system.model.MenuInVo;
import sra.system.model.MenuOutVo;

@PrimaryMapperRepository("menuMapperDao")
public interface MenuMapperDao {
  List<MenuOutVo> selectMainMenu();

  List<MenuOutVo> selectSubMenu(MenuInVo paramMenuInVo);
}


/* Location:              C:\spo\workspace\.metadata\.plugins\org.eclipse.wst.server.core\tmp0\wtpwebapps\sra\WEB-INF\classes\!\sra\system2\menu\sevice\dao\MenuMapperDao.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version:       1.1.3
 */