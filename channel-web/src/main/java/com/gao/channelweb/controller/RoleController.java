package com.gao.channelweb.controller;

import com.alibaba.fastjson.JSONObject;
import com.gao.channelcore.business.service.RoleService;
import com.gao.channelcore.business.service.UserService;
import com.gao.channelcore.pojo.Role;
import com.gao.channelcore.pojo.User;
import com.gao.channelcore.utils.HttpUtil;
import com.gao.channelcore.utils.JwtHelper;
import com.gao.channelcore.utils.ServiceUtil;
import io.jsonwebtoken.Claims;
import java.util.List;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.Map;

@RequestMapping("")
@Controller
public class RoleController {

  @Autowired
  private RoleService roleService;

  @RequestMapping("source/getRoleDetail")
  @ResponseBody
  public String getRoleDetail(@RequestParam Map<String, Object> map) {

    //处理前端排序字段  前端传入的为ascend descend
    if (map.containsKey("sortOrder") && map.get("sortOrder") != null) {
      String order = map.get("sortOrder").toString().split("end")[0];
      map.put("sortOrder", order);
    }
    return roleService.getRoleDetail(map);
  }

  @RequestMapping("source/insertRole")
  @ResponseBody
  public String insertUser(@RequestBody Role role) {
    return roleService.insertSelective(role);
  }

  @RequestMapping("source/updateRole")
  @ResponseBody
  public String updateRole(@RequestBody Role role) {
    roleService.updateByPrimaryKeySelective(role);
    return JSONObject.toJSONString(ServiceUtil.returnSuccess());
  }

  @RequestMapping("source/delRole")
  @ResponseBody
  public String delRole(@RequestParam Integer id) {
    roleService.delRole(id);
    return JSONObject.toJSONString(ServiceUtil.returnSuccess());
  }

  @RequestMapping("source/userSetRole")
  @ResponseBody
  public String insertRoleUser(@RequestParam Integer roleId, @RequestParam Integer[] userIdArr) {
    roleService.insertRoleUser(roleId, userIdArr);
    return JSONObject.toJSONString(ServiceUtil.returnSuccess());
  }

  @RequestMapping("source/getRoleUser")
  @ResponseBody
  public String insertRoleUser(@RequestParam Integer roleId) {
    String[] arr = roleService.getRoleUser(roleId);
    return JSONObject.toJSONString(ServiceUtil.returnSuccessData(arr));
  }

  @RequestMapping("source/menuSetRole")
  @ResponseBody
  public String menuSetRole(@RequestParam Integer roleId, @RequestParam String[] menuIdArr) {
    roleService.menuSetRole(roleId, menuIdArr);
    return JSONObject.toJSONString(ServiceUtil.returnSuccess());
  }

}
