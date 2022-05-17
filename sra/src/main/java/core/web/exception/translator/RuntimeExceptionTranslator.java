package core.web.exception.translator;

import static java.util.stream.Collectors.toList;

import java.util.List;
import java.util.Optional;

import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.util.Assert;

import core.web.exception.HttpErrorResponseTranslator;

public class RuntimeExceptionTranslator extends AbstractTypedHttpErrorResponseTranslator<RuntimeException> {
    private List<HttpErrorResponseTranslator> translators;

    public RuntimeExceptionTranslator ( List<HttpErrorResponseTranslator> translators ) {
        Assert.notNull( translators, "translators 는 null 일 수 없습니다." );
        this.translators = translators.stream()
                .filter( t -> !this.equals( t ) )
                .collect( toList() );
    }

    @Override
    public boolean supports ( Class<?> exception ) {
        return RuntimeException.class.isAssignableFrom( exception );
    }

    @Override
    public String type ( Exception exception ) {
        Throwable cause = exception.getCause();
        if ( cause != null && cause instanceof Exception ) {
            return cause.getClass().getSimpleName();
        }
        return exception.getClass().getSimpleName();
    }

    /*
     * TODO:
     * HttpErrorResponseTranslator 설계를 변경하던지
     * BizExceptionTranslator 에서 RuntimqException 을 처리하던지
     * 둘 중에 뭐라도 해야 해결되니까 일단은 RuntimqException 은 인지할 수 있는 오류라고 해놓자
     */
    @Override
    public boolean unknown () {
        return true;
    }

    @Override
    public HttpStatus getStatus () {
        return HttpStatus.INTERNAL_SERVER_ERROR;
    }

    @Override
    protected String doTranslateMessage ( RuntimeException exception, MessageSource messageSource ) {
        Throwable cause = exception.getCause();
        Optional<HttpErrorResponseTranslator> translatorOptional = translators.stream()
            .filter( t -> t.supports( cause.getClass() ) )
            .findFirst();
//        return translatorOptional.isPresent()
//            ? translatorOptional.get().translateMessage( (Exception) cause )
//            : "시스템 오류가 발생하였습니다.";
        return exception.getMessage();
    }
}
