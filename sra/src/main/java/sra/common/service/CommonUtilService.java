package sra.common.service;

import java.util.List;
import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

import sra.common.model.AdminVo;
import sra.common.model.CodeVo;

public interface CommonUtilService {
    Map<String, List<CodeVo>> selectCodeMap(Map<String, CodeVo> paramMap);
}
