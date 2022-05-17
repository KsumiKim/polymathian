package core.web.security.model;

import java.util.Collection;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;

public class AuthorizedAuthentication implements Authentication {

    private static final long serialVersionUID = 4191451033743947913L;
    private boolean authenticated;
    private AuthorizedDetails details;

    public AuthorizedAuthentication(AuthorizedDetails details) {
        this.details = details;
    }

    public Object getPrincipal() {
        return this.details.getUsername();
    }

    public Object getCredentials() {
        return this.details.getPassword();
    }

    public String getName() {
        return this.details.getUserId();
    }

    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.details.getAuthorities();
    }

    public AuthorizedDetails getDetails() {
        return this.details;
    }

    public boolean isAuthenticated() {
        return this.authenticated;
    }

    public void setAuthenticated( boolean isAuthenticated ) throws IllegalArgumentException {
        this.authenticated = isAuthenticated;
    }

}