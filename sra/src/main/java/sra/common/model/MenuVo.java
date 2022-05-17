package sra.common.model;

import java.util.HashMap;
import java.util.List;

import lombok.Data;

@Data
public class MenuVo {
    private Integer id;
    private Integer parentId;
    private String name;
    private Integer depth;
    private String navigation;
    private String src;
    private HashMap<String, Boolean> auth;
    private List<ButtonVo> buttons;
    private List<MenuVo> children;
}
