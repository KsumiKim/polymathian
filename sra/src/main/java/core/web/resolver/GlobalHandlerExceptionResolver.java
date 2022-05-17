package core.web.resolver;

import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.Collection;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.InitializingBean;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.converter.ByteArrayHttpMessageConverter;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.http.converter.support.AllEncompassingFormHttpMessageConverter;
import org.springframework.http.converter.xml.SourceHttpMessageConverter;
import org.springframework.security.core.AuthenticationException;
import org.springframework.ui.ModelMap;
import org.springframework.util.MimeType;
import org.springframework.web.accept.ContentNegotiationManager;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.request.ServletWebRequest;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.method.annotation.ExceptionHandlerMethodResolver;
import org.springframework.web.method.annotation.MapMethodProcessor;
import org.springframework.web.method.annotation.ModelAttributeMethodProcessor;
import org.springframework.web.method.annotation.ModelMethodProcessor;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.HandlerMethodArgumentResolverComposite;
import org.springframework.web.method.support.HandlerMethodReturnValueHandler;
import org.springframework.web.method.support.HandlerMethodReturnValueHandlerComposite;
import org.springframework.web.method.support.ModelAndViewContainer;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.View;
import org.springframework.web.servlet.handler.AbstractHandlerMethodExceptionResolver;
import org.springframework.web.servlet.mvc.method.annotation.HttpEntityMethodProcessor;
import org.springframework.web.servlet.mvc.method.annotation.ModelAndViewMethodReturnValueHandler;
import org.springframework.web.servlet.mvc.method.annotation.RedirectAttributesMethodArgumentResolver;
import org.springframework.web.servlet.mvc.method.annotation.RequestAttributeMethodArgumentResolver;
import org.springframework.web.servlet.mvc.method.annotation.RequestResponseBodyMethodProcessor;
import org.springframework.web.servlet.mvc.method.annotation.ServletInvocableHandlerMethod;
import org.springframework.web.servlet.mvc.method.annotation.ServletRequestMethodArgumentResolver;
import org.springframework.web.servlet.mvc.method.annotation.ServletResponseMethodArgumentResolver;
import org.springframework.web.servlet.mvc.method.annotation.SessionAttributeMethodArgumentResolver;
import org.springframework.web.servlet.mvc.method.annotation.ViewMethodReturnValueHandler;
import org.springframework.web.servlet.mvc.method.annotation.ViewNameMethodReturnValueHandler;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.servlet.support.RequestContextUtils;

import core.model.VMap;
import core.web.exception.HttpErrorResponseTranslator;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class GlobalHandlerExceptionResolver extends AbstractHandlerMethodExceptionResolver implements InitializingBean {
    private List<HandlerMethodArgumentResolver> customArgumentResolvers;

    private HandlerMethodArgumentResolverComposite argumentResolvers;

    private List<HandlerMethodReturnValueHandler> customReturnValueHandlers;

    private HandlerMethodReturnValueHandlerComposite returnValueHandlers;

    private List<HttpMessageConverter<?>> messageConverters;

    private ContentNegotiationManager contentNegotiationManager = new ContentNegotiationManager();

    private final Map<Object, ExceptionHandlerMethodResolver> exceptionHandlerCache = new LinkedHashMap<>();

    private List<HttpErrorResponseTranslator> errorTranslators;

    public GlobalHandlerExceptionResolver () {
        List<HttpMessageConverter<?>> converters = new ArrayList<>();
        converters.add( new ByteArrayHttpMessageConverter() );
        converters.add( new StringHttpMessageConverter() );
        try {
            converters.add( new SourceHttpMessageConverter<>() );
        } catch ( Error e ) {}
        converters.add( new AllEncompassingFormHttpMessageConverter() );
        this.messageConverters = converters;
        this.addExceptionHandler( new GlobalExceptionHandler() );
    }

    public void setCustomArgumentResolvers ( List<HandlerMethodArgumentResolver> customArgumentResolvers ) {
        this.customArgumentResolvers = customArgumentResolvers;
    }

    public void setCustomReturnValueHandlers( List<HandlerMethodReturnValueHandler> customReturnValueHandlers ) {
        this.customReturnValueHandlers = customReturnValueHandlers;
    }

    public void setMessageConverters ( List<HttpMessageConverter<?>> messageConverters ) {
        this.messageConverters = messageConverters;
    }

    public void setContentNegotiationManager ( ContentNegotiationManager contentNegotiationManager ) {
        this.contentNegotiationManager = contentNegotiationManager;
    }

    private void addExceptionHandler ( Object instance ) {
        exceptionHandlerCache.put( instance, new ExceptionHandlerMethodResolver( instance.getClass() ) );
    }

    public void setErrorTranslators ( List<HttpErrorResponseTranslator> errorTranslators ) {
        this.errorTranslators = errorTranslators;
    }

    @Override
    public void afterPropertiesSet () throws Exception {
        if ( this.argumentResolvers == null ) {
            List<HandlerMethodArgumentResolver> resolvers = getDefaultArgumentResolvers();
            this.argumentResolvers = new HandlerMethodArgumentResolverComposite().addResolvers( resolvers );
        }
        if ( this.returnValueHandlers == null ) {
            List<HandlerMethodReturnValueHandler> handlers = getDefaultReturnValueHandlers();
            this.returnValueHandlers = new HandlerMethodReturnValueHandlerComposite().addHandlers( handlers );
        }
    }

    protected List<HandlerMethodArgumentResolver> getDefaultArgumentResolvers () {
        List<HandlerMethodArgumentResolver> resolvers = new ArrayList<>();
        resolvers.add( new SessionAttributeMethodArgumentResolver() );
        resolvers.add( new RequestAttributeMethodArgumentResolver() );
        resolvers.add( new ServletRequestMethodArgumentResolver() );
        resolvers.add( new ServletResponseMethodArgumentResolver() );
        resolvers.add( new RedirectAttributesMethodArgumentResolver() );
        resolvers.add( new ModelMethodProcessor() );
        if ( customArgumentResolvers != null ) {
            resolvers.addAll( customArgumentResolvers );
        }
        return resolvers;
    }

    protected List<HandlerMethodReturnValueHandler> getDefaultReturnValueHandlers () {
        List<HandlerMethodReturnValueHandler> handlers = new ArrayList<>();
        handlers.add( new ModelAndViewMethodReturnValueHandler() );
        handlers.add( new ModelMethodProcessor() );
        handlers.add( new ViewMethodReturnValueHandler() );
        handlers.add( new HttpEntityMethodProcessor( messageConverters, contentNegotiationManager, null ) );
        handlers.add( new ModelAttributeMethodProcessor( false ) );
        handlers.add( new RequestResponseBodyMethodProcessor( messageConverters, contentNegotiationManager, null ) );
        handlers.add( new ViewNameMethodReturnValueHandler() );
        handlers.add( new MapMethodProcessor() );
        if ( customReturnValueHandlers != null ) {
            handlers.addAll( customReturnValueHandlers );
        }
        handlers.add( new ModelAttributeMethodProcessor( true ) );
        return handlers;
    }

    @Override
    protected ModelAndView doResolveHandlerMethodException ( HttpServletRequest request, HttpServletResponse response, HandlerMethod handlerMethod, Exception exception ) {
        HttpErrorResponseTranslator translator = errorTranslators.stream()
                .filter( t -> t.supports( exception.getClass() ) )
                .findFirst().orElseGet( () -> null );

        ServletInvocableHandlerMethod exceptionHandlerMethod = getExceptionHandlerMethod( handlerMethod, exception );
        if ( exceptionHandlerMethod == null ) {
            return null;
        }

        if ( this.argumentResolvers != null ) {
            exceptionHandlerMethod.setHandlerMethodArgumentResolvers( this.argumentResolvers );
        }

        if ( this.returnValueHandlers != null ) {
            exceptionHandlerMethod.setHandlerMethodReturnValueHandlers( this.returnValueHandlers );
        }
        ServletWebRequest webRequest = new ServletWebRequest( request, response );
        ModelAndViewContainer mavContainer = new ModelAndViewContainer();

        try {
            log.debug( "Using @ExceptionHandler " + exceptionHandlerMethod );
            Throwable cause = exception.getCause();
            if ( cause != null ) {
                exceptionHandlerMethod.invokeAndHandle( webRequest, mavContainer, translator, exception, cause, handlerMethod );
            } else {
                exceptionHandlerMethod.invokeAndHandle( webRequest, mavContainer, translator, exception, handlerMethod );
            }
        } catch ( Throwable e ) {
            if ( e != exception && e != exception.getCause() ) {
                log.warn( "Failure in @ExceptionHandler " + exceptionHandlerMethod, e );
            }
            return null;
        }

        if ( mavContainer.isRequestHandled() ) {
            return new ModelAndView();
        } else {
            ModelMap model = mavContainer.getModel();
            HttpStatus status = mavContainer.getStatus();
            ModelAndView mav = new ModelAndView( mavContainer.getViewName(), model, status );
            mav.setViewName( mavContainer.getViewName() );

            if ( !mavContainer.isViewReference() ) {
                mav.setView( ( View ) mavContainer.getView() );
            }

            if ( model instanceof RedirectAttributes ) {
                Map<String, ?> flashAttributes = ( ( RedirectAttributes ) model ).getFlashAttributes();
                RequestContextUtils.getOutputFlashMap( request ).putAll( flashAttributes );
            }
            return mav;
        }
    }

    protected ServletInvocableHandlerMethod getExceptionHandlerMethod ( HandlerMethod handlerMethod, Exception exception ) {
        for ( Entry<Object, ExceptionHandlerMethodResolver> entry : exceptionHandlerCache.entrySet() ) {
            Object instance = entry.getKey();
            ExceptionHandlerMethodResolver resolver = entry.getValue();
            Method method = resolver.resolveMethod( exception );
            if ( method != null ) {
                return new ServletInvocableHandlerMethod( instance, method );
            }
        }
        return null;
    }

    private class GlobalExceptionHandler {
        @ExceptionHandler( Exception.class )
        public @ResponseBody Object handle ( HttpServletRequest request, HttpServletResponse response, HttpErrorResponseTranslator translator, Exception exception ) {
            if ( !( exception instanceof AuthenticationException ) ) {
                log.error( "exception logging", exception );
            }
            HttpStatus statusCode = translator.getStatus();
            String type = translator.type( exception );
            String viewName = translator.viewName();
            boolean unknown = translator.unknown();
            String message = translator.translateMessage( exception );

            response.setStatus( statusCode.value() );

            String accept = request.getHeader( HttpHeaders.ACCEPT );
            List<MediaType> acceptTypes = MediaType.parseMediaTypes( accept );
            if ( isPresentIn( MediaType.TEXT_HTML, acceptTypes ) ) {
                ModelAndView mv = new ModelAndView();
                mv.setStatus( statusCode );
                mv.setViewName( viewName );
                mv.addObject( "type", type );
                mv.addObject( "unknown", unknown );
                mv.addObject( "message", message );
                return mv;
            }
            VMap returnValue = new VMap();
            returnValue.put( "type", type );
            returnValue.put( "unknown", unknown );
            returnValue.put( "message", message );
            return returnValue;
        }
    }

    private boolean isPresentIn ( MimeType type, Collection<? extends MimeType> mimeTypes ) {
        for ( MimeType mimeType : mimeTypes ) {
            if ( mimeType.equals( type ) ) {
                return true;
            }
        }
        return false;
    }
}
