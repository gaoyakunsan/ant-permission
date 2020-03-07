package com.gao.channelcore.business.service;

import com.alibaba.fastjson.JSONObject;
import com.gao.channelcore.business.dao.RoleMapper;
import com.gao.channelcore.business.dao.RoleMenuMapper;
import com.gao.channelcore.business.dao.RoleUserMapper;
import com.gao.channelcore.pojo.Role;
import com.gao.channelcore.pojo.RoleMenu;
import com.gao.channelcore.pojo.RoleUser;
import com.gao.channelcore.pojo.User;
import com.gao.channelcore.utils.ServiceUtil;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;

import java.util.Arrays;

import org.omg.PortableInterceptor.INACTIVE;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class RoleService {

    private static final Logger logger = LoggerFactory.getLogger(RoleService.class);

    @Autowired
    private RoleMapper roleMapper;
    @Autowired
    private RoleUserMapper roleUserMapper;
    @Autowired
    private RoleMenuMapper roleMenuMapper;

    public String getRoleDetail(Map<String, Object> map) {
        PageHelper.startPage(Integer.parseInt(map.get("pageNo") + ""),
                Integer.parseInt(map.get("pageSize") + ""));
        List<Role> list = roleMapper.getRoleDetail(map);
        PageInfo<Role> pageInfo = new PageInfo<>(list);
        return JSONObject.toJSONString(ServiceUtil.returnSuccessData(pageInfo));
    }

    public String insertSelective(Role role) {
        //检查是否有重名
        Map map = new HashMap();
        map.put("name", role.getName());
        List<Role> list = roleMapper.getRoleBYParmas(map);
        if (list != null && list.size() > 0) {
            return JSONObject.toJSONString(ServiceUtil.returnError("此角色名已存在"));
        } else {
            roleMapper.insertSelective(role);
            return JSONObject.toJSONString(ServiceUtil.returnSuccess());
        }
    }

    public void updateByPrimaryKeySelective(Role role) {
        roleMapper.updateByPrimaryKeySelective(role);
    }

    public void delRole(Integer roleId) {
        Role role = new Role();
        role.setId(roleId);
        role.setIsactive(false);
        updateByPrimaryKeySelective(role);
        //删除 role user 表
        roleUserMapper.updateByRoleId(roleId);
        //删除 role menu 表
        roleMenuMapper.updateByRoleId(roleId);
    }

    public void insertRoleUser(Integer roleId, Integer[] userIdArr) {
        //先删除此角色下的用户
        //删除 role user 表
        roleUserMapper.updateByRoleId(roleId);

        for (Integer userId : userIdArr) {
            RoleUser record = new RoleUser();
            record.setRoleId(roleId);
            record.setUserId(userId);
            roleUserMapper.insertSelective(record);
        }
    }

    public void menuSetRole(Integer roleId, String[] menuIdArr) {
        //先删除此角色下的菜单
        //删除 role user 表
        roleMenuMapper.updateByRoleId(roleId);
        for (String menuId : menuIdArr) {
            RoleMenu record = new RoleMenu();
            record.setRoleId(roleId);
            record.setMenuId(Integer.valueOf(menuId));
            roleMenuMapper.insertSelective(record);
        }
    }


    public String[] getRoleUser(Integer roleId) {
        List<RoleUser> list = roleUserMapper.selectUserIdByRoleId(roleId);
        if (list != null && list.size() > 0) {
            String[] userIds = new String[list.size()];
            for (int i = 0; i < list.size(); i++) {
                userIds[i] = String.valueOf(list.get(i).getUserId());
            }
            return userIds;
        } else {
            return new String[0];
        }
    }

}
