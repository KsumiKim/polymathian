package sra.common.service.impl;

import static java.util.Comparator.comparingInt;
import static java.util.stream.Collectors.toList;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.Base64Utils;
import org.springframework.web.multipart.MultipartFile;

import core.web.security.model.AuthorizedDetails;
import core.web.security.model.WritableAuthorizedDetails;
import egovframework.rte.fdl.string.EgovObjectUtil;
import lombok.extern.slf4j.Slf4j;
import sra.common.model.AdminVo;
import sra.common.model.ButtonVo;
import sra.common.model.MenuVo;
import sra.common.service.AdminService;
import sra.common.service.BaseService;
import sra.common.service.dao.AdminMapperDao;

@Slf4j
@Service( "adminService" )
public class AdminServiceImpl extends BaseService implements AdminService {
    @Resource( name = "sha512PasswordEncoder" )
    private PasswordEncoder sha512PasswordEncoder;

    @Resource( name = "aria256PasswordEncoder" )
    private PasswordEncoder aria256PasswordEncoder;

    @Resource( name = "adminMapperDao" )
    private AdminMapperDao adminMapperDao;

    @Override
    public UserDetails loadUserByUsername ( String userId ) throws UsernameNotFoundException {
        AdminVo adminVo = adminMapperDao.findByUserId( userId );
        if ( adminVo == null ) {
            throw new UsernameNotFoundException( "Not found user." );
        }
        return new WritableAuthorizedDetails( adminVo, new ArrayList<>() );
    }

    @Override
    public void onLogin ( HttpServletRequest request, Authentication authentication ) {
        AuthorizedDetails details = (AuthorizedDetails) authentication.getDetails();
    }

    @Override
    public void onLogout ( HttpServletRequest request, Authentication authentication ) {}

    @Override
    public void updateAdminPassword ( AdminVo param ) {
        String rawPassword = param.getPassword();
        String encodedPassword = sha512PasswordEncoder.encode( rawPassword );
    }

    public List<MenuVo> selectMenuList () {
        List<MenuVo> menuList = adminMapperDao.selectMenuList();
        menuList.parallelStream().forEach( m -> {
            List<ButtonVo> buttons = m.getButtons().stream()
                    .sorted( comparingInt( ButtonVo::getOrder ) ).collect( toList() );

            m.setButtons( buttons );
            if ( buttons != null && !buttons.isEmpty() ) {
                m.setAuth( buttons.stream()
                    .collect(
                        Collectors.toMap(
                            ButtonVo::getId,
                            b -> true,
                            ( a, b ) -> null,
                            HashMap<String, Boolean>::new
                        )
                    )
                );
            }

            if ( m.getSrc() == null ) {
                m.setNavigation( null );
            }
        } );
        return menuList;
    }

    public List<MenuVo> selectHierarchyMenuList () {
        List<MenuVo> results = new ArrayList<>();
        recursiveSeedingMenu( selectMenuList(), null, results );
        return results;
    }

    private void recursiveSeedingMenu ( List<MenuVo> menuList, Integer parentId, List<MenuVo> seed ) {
        menuList.stream()
            .filter( m -> m.getParentId() == parentId )
            .forEach( m -> {
                seed.add( m );
                List<MenuVo> superSeed = new ArrayList<>();
                recursiveSeedingMenu( menuList, m.getId(), superSeed );
                if ( superSeed != null && !superSeed.isEmpty() ) {
                    m.setChildren( superSeed );
                }
            } );
    }

    @Override
    public void signup(AdminVo param, List<MultipartFile> multipartFile) throws IOException {
        String encodedPassword = sha512PasswordEncoder.encode(param.getPassword());
        param.setPassword(encodedPassword);

        if (!EgovObjectUtil.isNull(multipartFile) && !multipartFile.isEmpty() ) {
            String thumbnail = Base64Utils.encodeToString(multipartFile.get(0).getBytes());
            param.setThumbnail(thumbnail);
        }
        adminMapperDao.signup(param);
    }
}
