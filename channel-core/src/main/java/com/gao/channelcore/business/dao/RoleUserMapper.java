package com.gao.channelcore.business.dao;

import com.gao.channelcore.pojo.RoleUser;
import java.util.List;
import org.omg.PortableInterceptor.INACTIVE;

public interface RoleUserMapper {

  int deleteByPrimaryKey(Integer id);

  int insert(RoleUser record);

  int insertSelective(RoleUser record);

  RoleUser selectByPrimaryKey(Integer id);

  List<RoleUser> selectUserIdByRoleId(Integer roleId);

  int updateByPrimaryKeySelective(RoleUser record);

  int updateByPrimaryKey(RoleUser record);

  void updateByRoleId(Integer roleId);
}