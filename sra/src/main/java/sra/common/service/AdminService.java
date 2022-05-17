package sra.common.service;

import core.web.security.handler.LoginSuccessProceedHandler;
import core.web.security.handler.LogoutSuccessProceedHandler;

import java.io.IOException;
import java.util.List;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.multipart.MultipartFile;

import sra.common.model.AdminVo;
import sra.common.model.MenuVo;

public interface AdminService extends UserDetailsService, LoginSuccessProceedHandler, LogoutSuccessProceedHandler {
    void updateAdminPassword(AdminVo paramAdminVo);

    List<MenuVo> selectMenuList();

    List<MenuVo> selectHierarchyMenuList();

    void signup(AdminVo param, List<MultipartFile> file) throws IOException;
}