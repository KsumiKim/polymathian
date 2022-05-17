package sra.sample.service;

import core.model.VMap;
import java.util.List;
import sra.sample.model.UserVo;

public interface SampleService {
  List<VMap> selectUserList(VMap paramVMap);
  
  void saveUserOne(VMap paramVMap);
  
  void deleteUserList(VMap paramVMap);
  
  void updatePassword(UserVo paramUserVo);
}


/* Location:              C:\spo\workspace\.metadata\.plugins\org.eclipse.wst.server.core\tmp0\wtpwebapps\sra\WEB-INF\classes\!\sra\sample\service\SampleService.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version:       1.1.3
 */