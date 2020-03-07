package com.gao.channelcore.business.dao;

import com.gao.channelcore.pojo.Role;

import java.util.List;
import java.util.Map;

public interface RoleMapper {
    int insert(Role record);

    int insertSelective(Role record);

    List<Role> getRoleDetail(Map<String, Object> map);

    List<Role> getRoleBYParmas(Map<String, Object> map);

    void updateByPrimaryKeySelective(Role record);
}