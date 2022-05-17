package sra.system.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;

import core.model.PageParam;
import core.model.RowState;
import core.web.security.model.AuthorizedDetails;
import sra.common.service.BaseService;
import sra.system.model.ProgramButtonInVo;
import sra.system.model.ProgramButtonOutVo;
import sra.system.model.ProgramInVo;
import sra.system.model.ProgramOutVo;
import sra.system.service.ProgramManagementService;
import sra.system.service.dao.ProgramManagementMapperDao;

@Service( "programManagementService" )
public class ProgramManagementServiceImpl extends BaseService implements ProgramManagementService {

    @Resource( name = "programManagementMapperDao" )
    private ProgramManagementMapperDao programManagementMapperDao;


    /*
     * 프로그램 목록 조회
     * @param param
     * @return PageInfo<ProgramOutVo>
     * @throws Exception
     */
    @Override
    public PageInfo<ProgramOutVo> selectProgramList( PageParam<String> param ) throws Exception {

        try ( Page<ProgramOutVo> page = PageHelper.startPage( param.getPageNum(), param.getPageSize() ) ) {
            page.doSelectPage( () -> programManagementMapperDao.selectProgramList( param.getParam() ) );
            PageInfo<ProgramOutVo> pageInfo = PageInfo.of( page, param.getNavigatePages() );
            return pageInfo;
        }

    }

    /*
     * 프로그램 버튼 목록 조회
     *
     * @param programInVo
     * @throws Exception
     */
    @Override
    @Transactional
    public List<ProgramButtonOutVo> selectProgramButtonList( ProgramInVo programInVo ) throws Exception {

        return programManagementMapperDao.selectProgramButtonList( programInVo );
    }

    /*
     * 프로그램 등록, 수정, 삭제
     *
     * @param params
     * @param authorizedDetails
     * @throws Exception
     */
    @Override
    @Transactional
    public void modifyProgram( RowState<ProgramInVo> params, AuthorizedDetails  authorizedDetails ) throws Exception {

        params.forEachCreated( p -> {
            programManagementMapperDao.insertProgram( p );
        } );

        params.forEachUpdated( p -> {
            programManagementMapperDao.updateProgram( p );
        } );

        // 프로그램 삭제 시 해당 프로그램에 등록된 버튼이 같이 삭제됨
        params.forEachDeleted( p -> {
            programManagementMapperDao.deleteProgram( p );
            programManagementMapperDao.deleteButtonByProgram( p );
        } );

    }

    /*
     * 프로그램 버튼 등록, 수정, 삭제
     *
     * @param params
     * @param authorizedDetails
     * @throws Exception
     */
    @Override
    @Transactional
    public void modifyProgramButton( RowState<ProgramButtonInVo> params, AuthorizedDetails  authorizedDetails ) throws Exception {

        params.forEachCreated( p -> {
            Integer buttonCnt = programManagementMapperDao.selectProgramButtonCnt( p );
            if ( buttonCnt > 0 ) {
                 throw proccessException( "{0} 은(는) 이미 등록된 버튼 ID입니다." , p.getButtonId() );
            }
            programManagementMapperDao.insertProgramButton( p );
        } );


        params.forEachUpdated( p -> {
            programManagementMapperDao.updateProgramButton( p );
        } );

        params.forEachDeleted( p -> {
            programManagementMapperDao.deleteProgramButton( p );
        } );

    }

}
