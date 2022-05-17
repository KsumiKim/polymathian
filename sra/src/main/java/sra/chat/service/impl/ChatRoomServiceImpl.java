package sra.chat.service.impl;

import egovframework.rte.fdl.string.EgovStringUtil;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import javax.annotation.PostConstruct;
import javax.annotation.Resource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sra.chat.model.ChatMessage;
import sra.chat.model.ChatRoom;
import sra.chat.model.UserVo;
import sra.chat.service.ChatRoomService;
import sra.chat.service.dao.ChatMapperDao;
import sra.common.service.BaseService;

@Service("chatRoomService")
public class ChatRoomServiceImpl extends BaseService implements ChatRoomService {

    private Map<String, List<ChatRoom>> chatRoomMap;

    @Resource(name = "chatMapperDao")
    private ChatMapperDao chatMapperDao;

    public List<UserVo> selectUserList(String userId) {
        List<UserVo> userList = this.chatMapperDao.selectUserList(userId);
        return userList;
    }

    @PostConstruct
    private void init() {
        this.chatRoomMap = new HashMap<>();
    }


    public void createPrivateChatRoom() {
        List<UserVo> userList = selectUserList(null);

        userList.forEach(u -> {
          ChatRoom room = new ChatRoom();
          room.setRoomId("/topic/private-message-" + u.getUserId());
          List<ChatRoom> roomList = this.chatRoomMap.getOrDefault(u.getUserId(), new ArrayList<>());
          if (!roomList.contains(room)) {
             roomList.add(room);
             this.chatRoomMap.put(u.getUserId(), roomList);
           }
     });
    }

   public ChatRoom selectChatRoom(ChatMessage message) {
     String roomId = this.chatMapperDao.selectChatRoom(message);

     if (EgovStringUtil.isEmpty(roomId)) {
       roomId = UUID.randomUUID().toString();
     }
     ChatRoom room = new ChatRoom();
     room.setRoomId(roomId);
     return room;
   }


   public ChatRoom findRoomById(String id) {
     return ((List<ChatRoom>)this.chatRoomMap.get(id)).get(0);
   }


   public Map<String, List<ChatRoom>> selectRooms() {
     return this.chatRoomMap;
   }


   public ChatRoom createChatRoomForSleepUser(UserVo param) {
     ChatRoom room = new ChatRoom();
     room.setRoomId(UUID.randomUUID().toString());
     List<ChatRoom> roomList = this.chatRoomMap.getOrDefault(param.getUserId(), new ArrayList<>());
     roomList.add(room);
     this.chatRoomMap.put(param.getUserId(), roomList);
     return room;
   }

   @Transactional(rollbackFor = {Exception.class})
   public void insertChatMessage(String roomId, ChatMessage message) {
     if (EgovStringUtil.isEmpty(message.getRoomId())) {
       return;
     }

     message.setWriterId(message.getWriter().getUserId());
     message.setReceiverId(message.getReceiver().getUserId());
     this.chatMapperDao.insertChatMessage(message);
   }

   public void saveUserRoom(String userId, String roomId) {
     ChatRoom room = new ChatRoom();
     room.setRoomId(roomId);
     List<ChatRoom> chatRooms = this.chatRoomMap.getOrDefault(userId, new ArrayList<>());
     chatRooms.add(room);
     this.chatRoomMap.put(userId, chatRooms);
   }


   public List<ChatMessage> selectChatHistories(ChatMessage param) {
     return this.chatMapperDao.selectChatHistories(param);
   }
 }