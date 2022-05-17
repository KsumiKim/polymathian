package sra.chat.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import sra.chat.model.Status;
import sra.chat.model.UserVo;

@Component
public class WebSocketDiconnectionHandler implements ApplicationListener<SessionDisconnectEvent> {
    @Autowired
    private SimpMessagingTemplate template;

    public void onApplicationEvent(SessionDisconnectEvent event) {
        UserVo userVo = UserVo.builder().userId(event.getUser().getName()).status(Status.DISCONNECT).build();
        this.template.convertAndSend("/topic/status", userVo);
    }
}

