package sra.common.service.dao;

import java.util.List;

import core.annotation.PrimaryMapperRepository;
import sra.common.model.AdminVo;
import sra.common.model.MenuVo;

@PrimaryMapperRepository("adminMapperDao")
public interface AdminMapperDao {
    List<MenuVo> selectMenuList();

    AdminVo findByUserId(String paramString);

    int signup(AdminVo param);
}
