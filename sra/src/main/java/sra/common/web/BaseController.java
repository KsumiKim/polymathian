package sra.common.web;

import core.web.security.model.AuthorizedAuthentication;
import core.web.security.model.AuthorizedDetails;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import sra.common.service.BaseService;

public class BaseController extends BaseService {

    protected AuthorizedDetails getDetails() throws Exception {
        return getAuthentication().getDetails();
    }

    protected AuthorizedAuthentication getAuthentication() throws Exception {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication instanceof AuthorizedAuthentication) {
            return (AuthorizedAuthentication)authentication;
        }
        throw proccessException("인증 오류", new Object[0]);
    }

    protected boolean isAuthenticated() throws Exception {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return (authentication instanceof AuthorizedAuthentication) ? authentication.isAuthenticated() : false;
   }
}
