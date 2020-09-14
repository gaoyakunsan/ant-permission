package com.gao.channelweb.controller;

import com.alibaba.fastjson.JSONObject;
import com.gao.channelcore.business.service.MenuService;
import com.gao.channelcore.pojo.Menu;
import com.gao.channelcore.utils.CommUtil;
import com.gao.channelcore.utils.ServiceUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;
import java.util.Map;

@RequestMapping("menu")
@Controller
public class MenuController {

    @Autowired
    private MenuService menuService;

    @RequestMapping("getAllMenu")
    @ResponseBody
    public String selectAllMenu() {
        List<Map<String, Object>> list1 = menuService.selectAllMenuByMap();
        List<Map<String, Object>> list2 = CommUtil.getChildrenNodeByTree(0, list1);
        return JSONObject.toJSONString(ServiceUtil.returnSuccessData(list2));
    }

    @RequestMapping("getAllMenuId")
    @ResponseBody
    public String getAllMenuId() {
        String[] idArr = menuService.getAllMenuId();
        return JSONObject.toJSONString(ServiceUtil.returnSuccessData(idArr));
    }

    @RequestMapping("getAllMenuByTree")
    @ResponseBody
    public String getAllMenuByTree() {
        List<Map<String, Object>> list1 = menuService.selectAllMenuByTree();
        List<Map<String, Object>> list2 = CommUtil.getChildrenNodeByTree(0, list1);
        return JSONObject.toJSONString(ServiceUtil.returnSuccessData(list2));
    }

    @RequestMapping("getAllMenuByRoleId")
    @ResponseBody
    public String getAllMenuByRoleId(@RequestParam Integer roleId) {
        String[] strArr = menuService.getAllMenuByRoleId(roleId);
        return JSONObject.toJSONString(ServiceUtil.returnSuccessData(strArr));
    }

    @RequestMapping("updateMenu")
    @ResponseBody
    public String updateMenu(@RequestBody Menu menu) {
        //校验是否存在同名的menu
        Menu menuParam = new Menu();
        menuParam.setShowText(menu.getShowText());
        List<Menu> menuDB = menuService.selectByParams(menuParam);
        if (menuDB != null && menuDB.size() > 0 && !menu.getShowText().equals(menuDB.get(0).getShowText())) {
            return JSONObject.toJSONString(ServiceUtil.returnError("此菜单名已存在"));
        } else {
            menuService.updateByPrimaryKeySelective(menu);
        }
        return JSONObject.toJSONString(ServiceUtil.returnSuccess());
    }

    @RequestMapping("saveMenu")
    @ResponseBody
    public String saveMenu(@RequestBody Menu menu) {
        Integer id = menuService.insertSelective(menu);
        return JSONObject.toJSONString(ServiceUtil.returnSuccessData(id));
    }

    @RequestMapping("delMenu")
    @ResponseBody
    public String delMenu(@RequestParam Integer menuId) {
        Menu record = new Menu();
        record.setId(menuId);
        record.setIsactive(false);
        menuService.updateByPrimaryKeySelective(record);
        return JSONObject.toJSONString(ServiceUtil.returnSuccess());
    }

}
