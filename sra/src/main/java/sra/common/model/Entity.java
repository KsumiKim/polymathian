package sra.common.model;

import java.util.Date;

import lombok.Data;

@Data
public class Entity {
    private Date updateDt;
    private String updateId;
    private Date insertDt;
    private String insertId;
}
