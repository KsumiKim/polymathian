package sra.chat.model;

import lombok.Data;
import sra.common.model.Entity;

@Data
public class ChatMessage extends Entity {
    private String roomId;
    private UserVo writer;
    private UserVo receiver;
    private String message;
    private String createdAt;
    private String writerId;
    private String writerNm;
    private String receiverId;
    private String receiverNm;

}
