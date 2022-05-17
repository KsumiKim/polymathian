package sra.system.model;

import lombok.Data;
import lombok.EqualsAndHashCode;
import sra.common.model.Entity;

@Data
@EqualsAndHashCode( callSuper = false )
public class ProgramButtonOutVo extends Entity {
    private String programSeq;
    private String buttonId;
    private String buttonNm;
    private String buttonDesc;
    private String useYn;
    private String authSystem;
    private String authUser;
}
