package core.web.support;

import java.io.IOException;
import javax.servlet.http.HttpServletRequest;

public interface RequestBodyProcessor {
  <T> T read(HttpServletRequest paramHttpServletRequest, String paramString, Class<T> paramClass) throws IOException;
}


/* Location:              C:\spo\workspace\.metadata\.plugins\org.eclipse.wst.server.core\tmp0\wtpwebapps\sra\WEB-INF\classes\!\core\web\support\RequestBodyProcessor.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version:       1.1.3
 */