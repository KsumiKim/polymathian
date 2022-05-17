package sra.common.model;

import lombok.Data;

@Data
public class MailVo {
    private String from;
    private String to;
    private String subject;
    private String text;
}
