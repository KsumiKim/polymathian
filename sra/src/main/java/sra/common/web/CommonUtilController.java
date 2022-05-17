package sra.common.web;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.mail.MessagingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import core.crypto.Sha256PasswordEncoder;
import core.mail.MailSenderFacade;
import core.mail.MailSenderFactory;
import core.support.FunctionHelper;
import sra.common.model.AdminVo;
import sra.common.model.CodeVo;
import sra.common.model.MailVo;
import sra.common.service.CommonUtilService;


@RestController
@RequestMapping({"/common"})
public class CommonUtilController extends BaseController {
    @Resource(name = "commonUtilService")
    private CommonUtilService commonUtilService;

    @Autowired
    private MailSenderFactory mailSenderFactory;

    @PostMapping({"/codeMap"})
    public Map<String, List<CodeVo>> codeMap(@RequestBody Map<String, CodeVo> param) {
        return this.commonUtilService.selectCodeMap(param);
    }

    @PostMapping({"/sendMail"})
    public void sendMail(@RequestBody MailVo param) throws MessagingException {
        MailSenderFacade sender = this.mailSenderFactory.createSimpleSender(builder -> {
            builder.from(param.getFrom())
                    .to(param.getTo())
                    .subject(param.getSubject())
                    .text(param.getText(), true);
        });
        sender.send();
    }

    @PostMapping({"/sendMultipartMail"})
    public void sendMultipartMail(@RequestPart("json") MailVo param, @RequestPart("files") List<MultipartFile> files) throws MessagingException, IllegalStateException, IOException {
        MailSenderFacade sender = this.mailSenderFactory.createMultipartSender(builder -> {
            builder.from(param.getFrom())
                    .to(param.getTo())
                    .subject(param.getSubject())
                    .text(param.getText(), true);

            files.forEach( FunctionHelper.exceptConsumer( f -> {
                File file = new File(f.getOriginalFilename());
                f.transferTo(file);
                builder.addAttachment(file.getName(), file);
            } ));
        });
        sender.send();
    }
}
