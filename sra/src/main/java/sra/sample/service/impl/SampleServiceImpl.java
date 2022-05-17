package sra.sample.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.stereotype.Service;

import core.model.VMap;
import sra.common.service.BaseService;
import sra.sample.model.UserVo;
import sra.sample.service.SampleService;
import sra.sample.service.dao.SampleMapperDao;

@Service( "sampleService" )
public class SampleServiceImpl extends BaseService implements SampleService {
    @Resource( name = "sampleMapperDao" )
    private SampleMapperDao sampleMapperDao;

    private List<VMap> userDataBase = new ArrayList<>();

    @Override
    public List<VMap> selectUserList ( VMap param ) {
        log.debug( ">>> SampleServiceImpl.selectUserList: {}", param );
        String keyword = param.getString( "keyword" );
        if ( keyword == null ) {
            return userDataBase;
        }
        Pattern pattern = Pattern.compile( keyword );
        return userDataBase.stream().filter( u -> {
            return pattern.matcher( u.getString( "userId" ) ).find() || pattern.matcher( u.getString( "userNm" ) ).find();
        } ).collect( Collectors.toList() );
    }

    @Override
    public void saveUserOne ( VMap user ) {
        log.debug( ">>> SampleServiceImpl.saveUserOne: {}", user );
        userDataBase.add( user );
    }

    @Override
    public void deleteUserList ( VMap users ) {
        log.debug( ">>> SampleServiceImpl.deleteUserList: {}", users );
    }

    @Override
    public void updatePassword(UserVo user) {
        user.setPwd( RandomStringUtils.randomAlphanumeric( 5 ) );
        sampleMapperDao.updatePassword( user );
    }
}
