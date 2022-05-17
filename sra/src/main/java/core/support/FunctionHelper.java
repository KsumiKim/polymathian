package core.support;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.function.Consumer;
import java.util.function.Function;
import java.util.function.Predicate;

public class FunctionHelper {
    public static <T, V> Predicate<T> distinctBy ( Function<T, V> keyExtractor ) {
        Map<V, Boolean> seen = new ConcurrentHashMap<>();
        return t -> seen.putIfAbsent( keyExtractor.apply( t ), true ) == null;
    }

    public static <T, R> Function<T, R> exceptFunction ( ExceptionFunction<T, R> f ) {
        return ( T r ) -> {
            try {
                return f.apply( r );
            } catch ( Exception e ) {
                throw new RuntimeException( e );
            }
        };
    }

    public static <T> Consumer<T> exceptConsumer ( ExceptionConsumer<T> f ) {
        return ( T t ) -> {
            try {
                f.accept( t );
            } catch ( Exception e ) {
                throw new RuntimeException( e );
            }
        };
    }
}
