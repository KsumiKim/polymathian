package sra.chat.service;

import java.util.List;
import java.util.Map;
import sra.chat.model.ChatMessage;
import sra.chat.model.ChatRoom;
import sra.chat.model.UserVo;

public interface ChatRoomService {
  void createPrivateChatRoom();
  
  ChatRoom selectChatRoom(ChatMessage paramChatMessage);
  
  ChatRoom findRoomById(String paramString);
  
  Map<String, List<ChatRoom>> selectRooms();
  
  List<UserVo> selectUserList(String paramString);
  
  ChatRoom createChatRoomForSleepUser(UserVo paramUserVo);
  
  void insertChatMessage(String paramString, ChatMessage paramChatMessage);
  
  void saveUserRoom(String paramString1, String paramString2);
  
  List<ChatMessage> selectChatHistories(ChatMessage paramChatMessage);
}


/* Location:              C:\spo\workspace\.metadata\.plugins\org.eclipse.wst.server.core\tmp0\wtpwebapps\sra\WEB-INF\classes\!\sra\chat\service\ChatRoomService.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version:       1.1.3
 */