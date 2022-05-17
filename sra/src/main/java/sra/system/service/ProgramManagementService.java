package sra.system.service;

import com.github.pagehelper.PageInfo;
import core.model.PageParam;
import core.model.RowState;
import core.web.security.model.AuthorizedDetails;
import java.util.List;
import sra.system.model.ProgramButtonInVo;
import sra.system.model.ProgramButtonOutVo;
import sra.system.model.ProgramInVo;
import sra.system.model.ProgramOutVo;

public interface ProgramManagementService {
  PageInfo<ProgramOutVo> selectProgramList(PageParam<String> paramPageParam) throws Exception;
  
  void modifyProgram(RowState<ProgramInVo> paramRowState, AuthorizedDetails paramAuthorizedDetails) throws Exception;
  
  List<ProgramButtonOutVo> selectProgramButtonList(ProgramInVo paramProgramInVo) throws Exception;
  
  void modifyProgramButton(RowState<ProgramButtonInVo> paramRowState, AuthorizedDetails paramAuthorizedDetails) throws Exception;
}


/* Location:              C:\spo\workspace\.metadata\.plugins\org.eclipse.wst.server.core\tmp0\wtpwebapps\sra\WEB-INF\classes\!\sra\system\service\ProgramManagementService.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version:       1.1.3
 */