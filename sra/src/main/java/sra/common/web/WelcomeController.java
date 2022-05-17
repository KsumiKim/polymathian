package sra.common.web;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import core.web.security.model.AuthorizedDetails;
import sra.common.model.AdminVo;
import sra.common.model.MenuVo;
import sra.common.service.AdminService;


@Controller
@PropertySource("classpath:properties/application.properties")
public class WelcomeController extends BaseController {

      @Value("${spring.profiles.active}")
      private String MODE;

      @Resource(name = "adminService")
      private AdminService adminService;

      @GetMapping({"/"})
      public ModelAndView indexPage(HttpServletResponse response, HttpServletRequest request) throws Exception {
          ModelAndView mv = new ModelAndView();
          mv.setViewName("index");
          mv.addObject("entryPoint", "main");
          mv.addObject("mode", MODE);
          return mv;
      }

      @GetMapping({"/login"})
      public ModelAndView loginPage() throws Exception {
        ModelAndView mv = new ModelAndView();
        if (isAuthenticated()) {
          mv.setViewName("redirect:/");
        } else {
          mv.setViewName("login");
          mv.addObject("entryPoint", "login");
          mv.addObject("mode", MODE);
        }
        return mv;
      }

      @GetMapping({"/auth/session"})
      @ResponseBody
      public AuthorizedDetails getSession() throws Exception {
        return getDetails();
      }

      @GetMapping({"/auth/menuList"})
      @ResponseBody
      public List<MenuVo> getMenuList() throws Exception {
        return adminService.selectHierarchyMenuList();
      }

      @PostMapping("/signup")
      @ResponseBody
      public void signup(@RequestPart("json") AdminVo param, @RequestPart("files") List<MultipartFile> files) throws Exception {
          adminService.signup(param, files);
      }
}
