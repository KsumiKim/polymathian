package core.support;

@FunctionalInterface
public interface ExceptionFunction<T, R> {
  R apply(T paramT) throws Exception;
}


/* Location:              C:\spo\workspace\.metadata\.plugins\org.eclipse.wst.server.core\tmp0\wtpwebapps\sra\WEB-INF\classes\!\core\support\ExceptionFunction.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version:       1.1.3
 */