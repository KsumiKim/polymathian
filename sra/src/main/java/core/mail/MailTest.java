package core.mail;

import javax.mail.MessagingException;

import org.springframework.beans.factory.annotation.Autowired;
public class MailTest {

    @Autowired
    private static MailSenderFactory mailSenderFactory;

    public static void main(String[] args) throws MessagingException {
        MailSenderFacade sender = mailSenderFactory.createSimpleSender(
                builder -> builder
                            .from("ksumikim@gmail.com")
                            .to("ksumikim@gmail.com")
                            .subject("이 메일은 스팸이아니라 개발 테스트 입니다.")
                            .text("이 본문을 당신은 볼 수 있습니까?", true)
                );
        sender.send();
    }
}
