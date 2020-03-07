package com.gao.channelcore.business.dao;

import com.gao.channelcore.model.MenuModel;
import com.gao.channelcore.pojo.Menu;
import java.util.List;
import java.util.Map;

public interface MenuMapper {

  int deleteByPrimaryKey(Integer id);

  int insert(Menu record);

  int insertSelective(Menu record);

  Menu selectByPrimaryKey(Integer id);

  List<Menu> selectByParams(Menu record);

  List<Menu> selectAllMenu();

  List<MenuModel> selectAllMenuByMenuModel();

  List<Map<String, Object>> selectAllMenuByMap();

  List<Map<String, Object>> selectAllMenuByTree();

  int updateByPrimaryKeySelective(Menu record);

  int updateByPrimaryKey(Menu record);
}