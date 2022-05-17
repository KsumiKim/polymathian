package sra.system.model;

import lombok.Data;

@Data
public class MenuOutVo {

    /**
     * 메뉴순번
     */
    private String menuSeq;

    /**
     * 상위순번
     */
    private String upperMenuSeq;

    /**
     * 메뉴명
     */
    private String menuNm;

    /**
     * 메뉴설명
     */
    private String menuDesc;

    /**
     * 메뉴단계
     */
    private String depth;

    /**
     * 정렬순서
     */
    private String sortNum;

    /**
     * 사용유무
     */
    private String useYn;

    /**
     * 프로그램 순번
     */
    private String programSeq;

    /**
     * 프로그램명
     */
    private String programNm;
}
