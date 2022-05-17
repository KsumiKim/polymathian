package sra.system.service.dao;

import core.annotation.PrimaryMapperRepository;
import java.util.List;
import org.apache.ibatis.annotations.Param;
import sra.system.model.ProgramButtonInVo;
import sra.system.model.ProgramButtonOutVo;
import sra.system.model.ProgramInVo;
import sra.system.model.ProgramOutVo;

@PrimaryMapperRepository("programManagementMapperDao")
public interface ProgramManagementMapperDao {
  List<ProgramOutVo> selectProgramList(@Param("programNm") String paramString);
  
  void insertProgram(ProgramInVo paramProgramInVo);
  
  void updateProgram(ProgramInVo paramProgramInVo);
  
  void deleteProgram(ProgramInVo paramProgramInVo);
  
  List<ProgramButtonOutVo> selectProgramButtonList(ProgramInVo paramProgramInVo);
  
  Integer selectProgramButtonCnt(ProgramButtonInVo paramProgramButtonInVo);
  
  void insertProgramButton(ProgramButtonInVo paramProgramButtonInVo);
  
  void updateProgramButton(ProgramButtonInVo paramProgramButtonInVo);
  
  void deleteProgramButton(ProgramButtonInVo paramProgramButtonInVo);
  
  void deleteButtonByProgram(ProgramInVo paramProgramInVo);
}


/* Location:              C:\spo\workspace\.metadata\.plugins\org.eclipse.wst.server.core\tmp0\wtpwebapps\sra\WEB-INF\classes\!\sra\system\service\dao\ProgramManagementMapperDao.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version:       1.1.3
 */