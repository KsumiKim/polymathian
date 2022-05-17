package sra.sample.model;

import lombok.Data;
import lombok.EqualsAndHashCode;
import sra.common.model.SessionVo;

@Data
@EqualsAndHashCode( callSuper = false )
public class UserVo extends SessionVo {
    private String userId;
    private String userNm;
    private String pwd;
}
