/*    */ package sra.system.web;
/*    */ 
/*    */ import core.util.JsonUtil;
/*    */ import java.util.List;
/*    */ import javax.annotation.Resource;
/*    */ import org.springframework.web.bind.annotation.PostMapping;
/*    */ import org.springframework.web.bind.annotation.RequestMapping;
/*    */ import org.springframework.web.bind.annotation.RequestPart;
/*    */ import org.springframework.web.bind.annotation.RestController;
/*    */ import org.springframework.web.multipart.MultipartFile;
/*    */ import sra.common.web.BaseController;
/*    */ import sra.system.model.BoardVo;
/*    */ import sra.system.service.FileManagementService;
/*    */ 
/*    */ 
/*    */ 
/*    */ 
/*    */ @RestController
/*    */ @RequestMapping({"/system/FileManagement"})
/*    */ public class FileManagementController
/*    */   extends BaseController
/*    */ {
/*    */   @Resource(name = "fileManagementService")
/*    */   private FileManagementService fileManagementService;
/*    */   
/*    */   @PostMapping({"/uploadFiles"})
/*    */   public void uploadFiles(@RequestPart("json") BoardVo board, @RequestPart("files") List<MultipartFile> files) throws Exception {
/* 28 */     this.log.debug("----------------------------------");
/* 29 */     this.log.debug("----------------------------------");
/* 30 */     this.log.debug("----------------------------------");
/* 31 */     this.log.debug("board: {}", JsonUtil.toJson(board));
/* 32 */     files.forEach(f -> this.log.debug("name: {} | ori-name: {}", f.getName(), f.getOriginalFilename()));
/*    */ 
/*    */     
/* 35 */     this.log.debug("----------------------------------");
/* 36 */     this.log.debug("----------------------------------");
/* 37 */     this.log.debug("----------------------------------");
/* 38 */     this.fileManagementService.uploadFiles(files);
/*    */   }
/*    */ }


/* Location:              C:\spo\workspace\.metadata\.plugins\org.eclipse.wst.server.core\tmp0\wtpwebapps\sra\WEB-INF\classes\!\sra\system\web\FileManagementController.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version:       1.1.3
 */