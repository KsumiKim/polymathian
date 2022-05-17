package core.web.security.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.Collection;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import sra.common.model.AdminVo;

@JsonIgnoreProperties({
    "username",
    "password",
    "authorities",
    "accountNonExpired",
    "accountNonLocked",
    "credentialsNonExpired",
    "enabled"})
public class WritableAuthorizedDetails extends User implements AuthorizedDetails {

    private static final long serialVersionUID = -1012240780689435798L;
    private String userId;
    private String userName;
    private String thumbnail;

    public WritableAuthorizedDetails(AdminVo adminVo, Collection<? extends GrantedAuthority> authorities) {
      super(adminVo.getUserId(), adminVo.getPassword(), authorities);
      this.userId = adminVo.getUserId();
      this.userName = adminVo.getUserName();
      this.thumbnail = adminVo.getThumbnail();
    }

    public String getUserId() {
      return this.userId;
    }

    public String getUserName() {
      return this.userName;
    }

    public String getThumbnail() {
      return this.thumbnail;
    }
}