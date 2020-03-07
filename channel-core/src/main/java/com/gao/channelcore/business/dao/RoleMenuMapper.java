package com.gao.channelcore.business.dao;

import com.gao.channelcore.pojo.RoleMenu;

import java.util.List;
import java.util.Map;

public interface RoleMenuMapper {

    int deleteByPrimaryKey(Integer id);

    int insert(RoleMenu record);

    int insertSelective(RoleMenu record);

    RoleMenu selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(RoleMenu record);

    int updateByPrimaryKey(RoleMenu record);

    void updateByRoleId(Integer roleId);

    List<RoleMenu> selectRoleMenuByParams(Map map);
}