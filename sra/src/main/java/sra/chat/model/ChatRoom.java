package sra.chat.model;

import java.util.List;

import lombok.Data;

@Data
public class ChatRoom {
    private String roomId;
    private String name;
    List<ChatMessage> messages;
}
