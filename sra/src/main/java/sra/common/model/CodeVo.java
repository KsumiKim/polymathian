package sra.common.model;

import lombok.Data;

@Data
public class CodeVo {
    // 그룹코드
    private String groupCd;
    // 코드
    private String detailCd;
    // 코드명
    private String detailNm;

    private String useYn;

    private String option01;
}
