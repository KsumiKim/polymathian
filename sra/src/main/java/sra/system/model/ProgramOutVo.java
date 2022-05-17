package sra.system.model;

import lombok.Data;
import lombok.EqualsAndHashCode;
import sra.common.model.Entity;

@Data
@EqualsAndHashCode( callSuper = false )
public class ProgramOutVo extends Entity {
    private String programSeq;
    private String programNm;
    private String programPath;
    private String programDesc;
    private String useYn;
    private String authSystem;
    private String authUser;
}
