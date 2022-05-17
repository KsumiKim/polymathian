package sra.chat.service.dao;

import core.annotation.PrimaryMapperRepository;
import java.util.List;
import org.apache.ibatis.annotations.Param;
import sra.chat.model.ChatMessage;
import sra.chat.model.UserVo;

@PrimaryMapperRepository("chatMapperDao")
public interface ChatMapperDao {
  List<UserVo> selectUserList(@Param("userId") String paramString);
  
  int insertChatMessage(ChatMessage paramChatMessage);
  
  String selectChatRoom(ChatMessage paramChatMessage);
  
  List<ChatMessage> selectChatHistories(ChatMessage paramChatMessage);
}


/* Location:              C:\spo\workspace\.metadata\.plugins\org.eclipse.wst.server.core\tmp0\wtpwebapps\sra\WEB-INF\classes\!\sra\chat\service\dao\ChatMapperDao.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version:       1.1.3
 */