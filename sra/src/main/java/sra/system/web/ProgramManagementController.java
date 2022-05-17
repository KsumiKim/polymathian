/*    */ package sra.system.web;
/*    */ 
/*    */ import com.github.pagehelper.PageInfo;
/*    */ import core.model.PageParam;
/*    */ import core.model.RowState;
/*    */ import java.util.List;
/*    */ import javax.annotation.Resource;
/*    */ import org.springframework.web.bind.annotation.PostMapping;
/*    */ import org.springframework.web.bind.annotation.RequestBody;
/*    */ import org.springframework.web.bind.annotation.RequestMapping;
/*    */ import org.springframework.web.bind.annotation.RestController;
/*    */ import sra.common.web.BaseController;
/*    */ import sra.system.model.ProgramButtonInVo;
/*    */ import sra.system.model.ProgramButtonOutVo;
/*    */ import sra.system.model.ProgramInVo;
/*    */ import sra.system.model.ProgramOutVo;
/*    */ import sra.system.service.ProgramManagementService;
/*    */ 
/*    */ 
/*    */ 
/*    */ 
/*    */ @RestController
/*    */ @RequestMapping({"/system/ProgramManagement"})
/*    */ public class ProgramManagementController
/*    */   extends BaseController
/*    */ {
/*    */   @Resource(name = "programManagementService")
/*    */   private ProgramManagementService programManagementService;
/*    */   
/*    */   @PostMapping({"/selectProgramList"})
/*    */   public PageInfo<ProgramOutVo> selectProgramList(@RequestBody PageParam<String> param) throws Exception {
/* 32 */     return this.programManagementService.selectProgramList(param);
/*    */   }
/*    */   
/*    */   @PostMapping({"/modifyProgram"})
/*    */   public void modifyProgram(@RequestBody RowState<ProgramInVo> params) throws Exception {
/* 37 */     this.programManagementService.modifyProgram(params, getDetails());
/*    */   }
/*    */   
/*    */   @PostMapping({"/selectProgramButtonList"})
/*    */   public List<ProgramButtonOutVo> selectProgramButtonList(@RequestBody ProgramInVo param) throws Exception {
/* 42 */     return this.programManagementService.selectProgramButtonList(param);
/*    */   }
/*    */   
/*    */   @PostMapping({"/modifyProgramButton"})
/*    */   public void modifyProgramButton(@RequestBody RowState<ProgramButtonInVo> params) throws Exception {
/* 47 */     this.programManagementService.modifyProgramButton(params, getDetails());
/*    */   }
/*    */ }


/* Location:              C:\spo\workspace\.metadata\.plugins\org.eclipse.wst.server.core\tmp0\wtpwebapps\sra\WEB-INF\classes\!\sra\system\web\ProgramManagementController.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version:       1.1.3
 */