/*    */ package sra.system.service.impl;
/*    */ import java.io.File;
/*    */ import java.io.InputStream;
/*    */ import java.util.List;
/*    */ import java.util.UUID;
/*    */ import org.apache.commons.io.FileUtils;
/*    */ import org.slf4j.Logger;
/*    */ import org.slf4j.LoggerFactory;
/*    */ import org.springframework.stereotype.Service;
/*    */ import org.springframework.web.multipart.MultipartFile;
/*    */ import sra.system.service.FileManagementService;
/*    */ 
/*    */ @Service("fileManagementService")
/*    */ public class FileManagementServiceImpl implements FileManagementService {
/* 15 */   private static final Logger log = LoggerFactory.getLogger(FileManagementServiceImpl.class);
/*    */ 
/*    */ 
/*    */   
/*    */   public void uploadFiles(List<MultipartFile> files) {
/* 20 */     log.debug("----------------------------------");
/* 21 */     log.debug("----------------------------------");
/* 22 */     log.debug("----------------------------------");
/* 23 */     files.forEach(f -> log.debug("name: {} | ori-name: {}", f.getName(), f.getOriginalFilename()));
/*    */ 
/*    */     
/* 26 */     log.debug("----------------------------------");
/* 27 */     log.debug("----------------------------------");
/* 28 */     log.debug("----------------------------------");
/*    */ 
/*    */     
/* 31 */     files.forEach(file -> {
/*    */           String originalFileName = file.getOriginalFilename();
/*    */           
/*    */           String extension = originalFileName.substring(originalFileName.lastIndexOf("."));
/*    */           
/*    */           String savedFileName = UUID.randomUUID() + extension;
/*    */           
/*    */           File target = new File("C:\\filedownlod", savedFileName);
/*    */           
/*    */           if (!(new File("C:\\filedownlod")).exists()) {
/*    */             (new File("C:\\filedownlod")).mkdirs();
/*    */           }
/*    */           
/*    */           try {
/*    */             InputStream fileStream = file.getInputStream();
/*    */             
/*    */             FileUtils.copyInputStreamToFile(fileStream, target);
/* 48 */           } catch (Exception e) {
/*    */             FileUtils.deleteQuietly(target);
/*    */             e.printStackTrace();
/*    */           } 
/*    */         });
/*    */   }
/*    */ }


/* Location:              C:\spo\workspace\.metadata\.plugins\org.eclipse.wst.server.core\tmp0\wtpwebapps\sra\WEB-INF\classes\!\sra\system\service\impl\FileManagementServiceImpl.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version:       1.1.3
 */