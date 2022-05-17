package core.web.security.handler;

import javax.servlet.http.HttpServletRequest;
import org.springframework.security.core.Authentication;

public interface LogoutSuccessProceedHandler {
  void onLogout(HttpServletRequest paramHttpServletRequest, Authentication paramAuthentication);
}


/* Location:              C:\spo\workspace\.metadata\.plugins\org.eclipse.wst.server.core\tmp0\wtpwebapps\sra\WEB-INF\classes\!\core\web\security\handler\LogoutSuccessProceedHandler.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version:       1.1.3
 */