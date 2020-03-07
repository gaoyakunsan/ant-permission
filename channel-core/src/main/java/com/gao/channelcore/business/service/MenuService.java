package com.gao.channelcore.business.service;

import com.gao.channelcore.business.dao.MenuMapper;
import com.gao.channelcore.business.dao.RoleMapper;
import com.gao.channelcore.business.dao.RoleMenuMapper;
import com.gao.channelcore.model.MenuModel;
import com.gao.channelcore.pojo.Menu;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.gao.channelcore.pojo.RoleMenu;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MenuService {

    @Autowired
    private MenuMapper menuMapper;
    @Autowired
    private RoleMenuMapper roleMenuMapper;

    public List<Menu> selectAllMenu() {
        return menuMapper.selectAllMenu();
    }

    public List<MenuModel> selectAllMenuByMenuModel() {
        return menuMapper.selectAllMenuByMenuModel();
    }

    public List<Map<String, Object>> selectAllMenuByMap() {
        return menuMapper.selectAllMenuByMap();
    }

    public String[] getAllMenuId(){
        List<Menu> list = menuMapper.selectAllMenu();
        if(list != null && list.size() > 0){
            String[] strArr = new String[list.size()];
            for(int i = 0; i < list.size(); i ++){
                strArr[i] = String.valueOf(list.get(i).getId());
            }
            return strArr;
        }else{
            return new String[0];
        }
    }

    public List<Map<String, Object>> selectAllMenuByTree() {
        return menuMapper.selectAllMenuByTree();
    }

    public String[] getAllMenuByRoleId(Integer roleId) {
        Map map = new HashMap();
        map.put("roleId", roleId);
        List<RoleMenu> list = roleMenuMapper.selectRoleMenuByParams(map);
        if (list != null && list.size() > 0) {
            String[] strArr = new String[list.size()];
            for (int i = 0; i < list.size(); i++) {
                strArr[i] = String.valueOf(list.get(i).getMenuId());
            }
            return strArr;
        } else {
            return new String[0];
        }
    }

    public void updateByPrimaryKeySelective(Menu record){
        menuMapper.updateByPrimaryKeySelective(record);
    }

    public Menu selectByPrimaryKey(Integer menuId){
        return menuMapper.selectByPrimaryKey(menuId);
    }

    public List<Menu> selectByParams(Menu record){
        return menuMapper.selectByParams(record);
    }

    public int insertSelective(Menu record){
        menuMapper.insertSelective(record);
        return record.getId();
    }


}
