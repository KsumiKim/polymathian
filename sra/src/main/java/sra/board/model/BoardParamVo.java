package sra.board.model;

import lombok.Data;
import lombok.EqualsAndHashCode;
import sra.common.model.Entity;

@Data
@EqualsAndHashCode( callSuper=false )
public class BoardParamVo extends Entity {

    private String articleCd;
    private String title;
    private String writer;
}
