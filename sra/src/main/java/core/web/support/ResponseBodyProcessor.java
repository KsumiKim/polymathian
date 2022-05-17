package core.web.support;

import java.io.IOException;
import javax.servlet.http.HttpServletResponse;

public interface ResponseBodyProcessor {
  void write(HttpServletResponse paramHttpServletResponse, int paramInt, String paramString, Object paramObject) throws IOException;
}


/* Location:              C:\spo\workspace\.metadata\.plugins\org.eclipse.wst.server.core\tmp0\wtpwebapps\sra\WEB-INF\classes\!\core\web\support\ResponseBodyProcessor.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version:       1.1.3
 */