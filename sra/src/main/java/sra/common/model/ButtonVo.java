package sra.common.model;

import lombok.Data;

@Data
public class ButtonVo {
    private String id;
    private String name;
    private int order;

    public void setId ( String id ) {
        this.id = id;
        if ( id != null ) {
            switch ( id ) {
                case "init": this.order = 1; break;
                case "search": this.order = 2; break;
                case "save": this.order = 3; break;
                case "delete": this.order = 4; break;
                default: this.order = 99; break;
            }
        }
    }
}
