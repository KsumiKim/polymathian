package sra.sample.service.dao;

import core.annotation.PrimaryMapperRepository;
import core.model.VMap;
import java.util.List;
import sra.sample.model.UserVo;

@PrimaryMapperRepository("sampleMapperDao")
public interface SampleMapperDao {
  List<VMap> test();
  
  void updatePassword(UserVo paramUserVo);
}


/* Location:              C:\spo\workspace\.metadata\.plugins\org.eclipse.wst.server.core\tmp0\wtpwebapps\sra\WEB-INF\classes\!\sra\sample\service\dao\SampleMapperDao.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version:       1.1.3
 */