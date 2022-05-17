package sra.chat.web;

import java.security.Principal;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import javax.annotation.Resource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.user.SimpUser;
import org.springframework.messaging.simp.user.SimpUserRegistry;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import sra.chat.model.ChatMessage;
import sra.chat.model.ChatRoom;
import sra.chat.model.Status;
import sra.chat.model.UserVo;
import sra.chat.service.ChatRoomService;
import sra.common.web.BaseController;




@RestController
@RequestMapping({"/chat"})
public class ChatController extends BaseController {

    @Resource(name = "chatRoomService")
    private ChatRoomService chatRoomService;

    @Autowired
    private SimpMessagingTemplate template;

    @Autowired
    private SimpUserRegistry registry;

    @MessageMapping({"/topic/{roomId}"})
    @SendTo({"/topic/{roomId}"})
    public ChatMessage sendMessage(@DestinationVariable String roomId, @Payload ChatMessage message) {
        chatRoomService.insertChatMessage(roomId, message);
        return message;
    }

    @MessageMapping({"/topic/status"})
    public void connect(Principal user, @Payload Status status) {
        UserVo userVo = UserVo.builder().userId(user.getName()).status(status).build();
        template.convertAndSend("/topic/status", userVo);
    }

    @PostMapping({"/selectUserList"})
    public List<UserVo> selectUsers() throws Exception {
        chatRoomService.createPrivateChatRoom();
        String userId = getDetails().getUsername();

        List<UserVo> users = chatRoomService.selectUserList(userId);

        if (users != null && !users.isEmpty()) {
            List<String> wsUsers = (List<String>)registry.getUsers().parallelStream()
                    .map(u -> u.getName()).collect(Collectors.toList());

            System.out.println(wsUsers);
            users.stream().forEach(u -> u.setStatus(wsUsers.contains(u.getUserId()) ? Status.CONNECT : Status.DISCONNECT));
        }
        return users;
    }

    @PostMapping({"/selectRooms"})
    public Map<String, List<ChatRoom>> selectRooms() {
        return chatRoomService.selectRooms();
    }


    @PostMapping({"/selectChatRoom"})
    public ChatRoom selectChatRoom(@RequestBody ChatMessage param) throws Exception {
        return chatRoomService.selectChatRoom(param);
    }


    @PostMapping({"/selectChatHistories"})
    public List<ChatMessage> selectChatHistories(@RequestBody ChatMessage param) throws Exception {
        return chatRoomService.selectChatHistories(param);
    }
 }