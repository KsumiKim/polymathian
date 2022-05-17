package core.support;

@FunctionalInterface
public interface ExceptionConsumer<T> {
  void accept(T paramT) throws Exception;
}
