package com.gao.channelweb.controller;

import com.alibaba.fastjson.JSONObject;
import com.gao.channelcore.business.service.UserService;
import com.gao.channelcore.pojo.User;
import com.gao.channelcore.utils.JwtHelper;
import com.gao.channelcore.utils.ServiceUtil;
import io.jsonwebtoken.Claims;

import java.net.InetAddress;
import java.net.UnknownHostException;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@RequestMapping("")
@Controller
public class UserController {

    @Autowired
    UserService userService;

    @Value("${audience.base64Secret}")
    private String base64Secret;


    @GetMapping
    public String goToLogin() {
        return "dist/index";
    }

    /**
     * 用户登录请求
     */
    @RequestMapping("login")
    @ResponseBody
    public String login(@RequestBody JSONObject jsonObject) {
        String ip = "";
        try {
            ip = this.getRemortIP();
        } catch (UnknownHostException e) {
            e.printStackTrace();
        }
        return userService.login(jsonObject, ip);
    }


    /**
     * 获取用户ip
     */
    private static String getRemortIP() throws UnknownHostException {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder
                .getRequestAttributes()).getRequest();
        String ip = request.getHeader("x-forwarded-for");

        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("Proxy-Client-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("WL-Proxy-Client-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getRemoteAddr();
        }
        if ("0:0:0:0:0:0:0:1".equals(ip)) {
            ip = InetAddress.getLocalHost().getHostAddress();//获取的是本地的IP地址
        }
        if (StringUtils.isNotBlank(ip)) {
            ip = ip.split(",")[0];
        }
        return ip;
    }

    @RequestMapping("user/vaildToken")
    @ResponseBody
    public String vaildToken(@RequestParam Map<String, Object> map) {
        Claims user = JwtHelper.getUserInfo(base64Secret);
        if (user == null) {
            return JSONObject.toJSONString(ServiceUtil.returnError());
        }
        return JSONObject.toJSONString(ServiceUtil.returnSuccess(user.get("unique_name") + ""));
    }

    @RequestMapping("user/getMenu")
    @ResponseBody
    public String getMenu() {
        Claims claims = JwtHelper.getUserInfo(base64Secret);
        if (claims == null) {
            return JSONObject.toJSONString(ServiceUtil.returnError("token失效，请重新登录"));
        }
        return userService.getUserMenu(claims.get("userid") + "");
    }

    @RequestMapping("source/getUserDetail")
    @ResponseBody
    public String getUserDetail(@RequestParam Map<String, Object> map) {

        //处理前端排序字段  前端传入的为ascend descend
        if (map.containsKey("sortOrder") && map.get("sortOrder") != null) {
            String order = map.get("sortOrder").toString().split("end")[0];
            map.put("sortOrder", order);
        }
        return userService.getUserDetail(map);
    }

    @RequestMapping("source/getAllUser")
    @ResponseBody
    public String getAllUser() {
        return userService.getAllUser();
    }


    @RequestMapping("source/insertUser")
    @ResponseBody
    public String insertUser(@RequestBody User user) {
        return userService.insertSelective(user);
    }

    @RequestMapping("source/updateUser")
    @ResponseBody
    public String updateUser(@RequestBody User user) {
        userService.updateByPrimaryKeySelective(user);
        return JSONObject.toJSONString(ServiceUtil.returnSuccess());
    }

    @RequestMapping("source/delUser")
    @ResponseBody
    public String delUser(@RequestParam Integer id) {
        User user = new User();
        user.setId(id);
        user.setStatus("0");
        userService.updateByPrimaryKeySelective(user);
        return JSONObject.toJSONString(ServiceUtil.returnSuccess());
    }

}
