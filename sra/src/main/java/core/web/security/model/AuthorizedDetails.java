package core.web.security.model;

import org.springframework.security.core.CredentialsContainer;
import org.springframework.security.core.userdetails.UserDetails;

public interface AuthorizedDetails extends UserDetails, CredentialsContainer {

    String getUserId();

    String getUserName();

    String getThumbnail();
}
