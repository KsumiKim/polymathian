package sra.common.service.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import core.annotation.PrimaryMapperRepository;
import sra.common.model.CodeVo;

@PrimaryMapperRepository("commonUtilMapperDao")
public interface CommonUtilMapperDao {
    List<CodeVo> selectCodeList(@Param("groupCd") String paramString1, @Param("useYn") String paramString2, @Param("option01") String paramString3);
}
