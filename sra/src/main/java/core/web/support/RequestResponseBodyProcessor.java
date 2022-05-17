package core.web.support;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpInputMessage;
import org.springframework.http.HttpOutputMessage;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;

import core.support.MediaTypeHelper;
import core.support.StreamHelper;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class RequestResponseBodyProcessor implements RequestBodyProcessor, ResponseBodyProcessor {
    private List<Pair<MediaType, HttpMessageConverter<?>>> converters;

    private Pair<MediaType, HttpMessageConverter<?>> defaultConverter;

    public RequestResponseBodyProcessor ( List<HttpMessageConverter<?>> converters ) {
        this.converters = converters.stream()
                .flatMap( c -> c.getSupportedMediaTypes().stream().map( m -> new Pair<MediaType, HttpMessageConverter<?>>( m, c ) ) )
                .collect( Collectors.toList() );
        setDefaultConverter();
    }

    private void setDefaultConverter () {
        MappingJackson2HttpMessageConverter converter = new MappingJackson2HttpMessageConverter();
        List<MediaType> mediaTypes = new ArrayList<>( 1 );
        mediaTypes.add( MediaType.APPLICATION_JSON );
        converter.setSupportedMediaTypes( mediaTypes );
        this.defaultConverter = new Pair<>( MediaType.APPLICATION_JSON, converter );
    }

    @SuppressWarnings( "unchecked" )
    @Override
    public <T> T read ( HttpServletRequest request, String contentType, Class<T> clazz ) throws IOException {
        MediaType requestContentType = MediaType.parseMediaType( contentType );
        Pair<MediaType, HttpMessageConverter<?>> pair = converters.stream()
                .filter( p -> p.getLeft().equals( requestContentType ) )
                .filter( p -> p.getRight().canRead( clazz, null ) )
                .findFirst()
                .orElse( defaultConverter );

        HttpMessageConverter<T> converter = ( HttpMessageConverter<T> ) pair.getRight();
        return converter.read( clazz, createHttpInputMessage( request ) );
    }

    @SuppressWarnings( "unchecked" )
    @Override
    public void write ( HttpServletResponse response, int status, String acceptHeader, Object value ) throws IOException {
        Pair<MediaType, HttpMessageConverter<?>> pair;
        try {
            List<MediaType> acceptMediaTypes = MediaType.parseMediaTypes( acceptHeader );
            pair = converters.stream()
                    .filter( p -> MediaTypeHelper.isPresentIn( p.getLeft(), acceptMediaTypes ) )
                    .filter( p -> p.getRight().canWrite( value.getClass(), null ) )
                    .findFirst()
                    .orElse( defaultConverter );
        } catch ( Exception e ) {
            log.error( e.getMessage(), e );
            pair = defaultConverter;
        }
        MediaType contentType = pair.getLeft();
        HttpMessageConverter<Object> converter = ( HttpMessageConverter<Object> ) pair.getRight();
        response.setStatus( status );
        response.setContentType( contentType.toString() );
        converter.write( value, null, createHttpOutputMessage( response ) );
    }

    private HttpInputMessage createHttpInputMessage ( HttpServletRequest request ) {
        final HttpHeaders headers = convertHttpHeaders( request );
        return new HttpInputMessage () {
            @Override
            public HttpHeaders getHeaders () {
                return headers;
            }

            @Override
            public InputStream getBody () throws IOException {
                return request.getInputStream();
            }
        };
    }

    private HttpOutputMessage createHttpOutputMessage ( HttpServletResponse response ) {
        final HttpHeaders headers = new HttpHeaders();
        return new HttpOutputMessage () {
            @Override
            public HttpHeaders getHeaders () {
                return headers;
            }

            @Override
            public OutputStream getBody () throws IOException {
                return response.getOutputStream();
            }
        };
    }

    private HttpHeaders convertHttpHeaders ( HttpServletRequest request ) {
        return StreamHelper.of( request.getHeaderNames() )
            .collect(
                Collectors.toMap(
                    Function.identity(),
                    h -> Collections.list( request.getHeaders( h ) ),
                    ( oldValue, newValue ) -> newValue,
                    HttpHeaders::new
                )
            );
    }

    private static class Pair<L, R> {
        private L left;

        private R right;

        public Pair ( L left, R right ) {
            this.left = left;
            this.right = right;
        }

        public L getLeft () {
            return left;
        }

        public R getRight () {
            return right;
        }
    }
}
