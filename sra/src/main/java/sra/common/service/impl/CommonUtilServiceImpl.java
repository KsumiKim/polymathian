package sra.common.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import core.crypto.Sha256PasswordEncoder;
import sra.common.model.AdminVo;
import sra.common.model.CodeVo;
import sra.common.service.BaseService;
import sra.common.service.CommonUtilService;
import sra.common.service.dao.CommonUtilMapperDao;

@Service( "commonUtilService" )
public class CommonUtilServiceImpl extends BaseService implements CommonUtilService {

    @Resource( name = "commonUtilMapperDao" )
    private CommonUtilMapperDao commonUtilMapperDao;

    @Autowired
    private Sha256PasswordEncoder sha256PasswordEncoder;

    @Override
    public Map<String, List<CodeVo>> selectCodeMap ( Map<String, CodeVo> param ) {
        Map<String, List<CodeVo>> results = new HashMap<>();
        param.entrySet().stream().forEach( entry -> {
            String key = entry.getKey();
            CodeVo value = entry.getValue();
            results.put( key, commonUtilMapperDao.selectCodeList( value.getGroupCd(), value.getUseYn(), value.getOption01() ) );
        } );
        return results;
    }

}
