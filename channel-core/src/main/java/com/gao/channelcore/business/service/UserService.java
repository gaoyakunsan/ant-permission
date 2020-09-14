package com.gao.channelcore.business.service;

import com.alibaba.druid.util.StringUtils;
import com.alibaba.fastjson.JSONObject;
import com.gao.channelcore.business.dao.UserMapper;
import com.gao.channelcore.pojo.Menu;
import com.gao.channelcore.pojo.User;
import com.gao.channelcore.utils.CommUtil;
import com.gao.channelcore.utils.JwtHelper;
import com.gao.channelcore.utils.ServiceUtil;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class UserService {

    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    @Value("${audience.clientId}")
    private String clientId;

    @Value("${audience.base64Secret}")
    private String base64Secret;

    @Value("${audience.name}")
    private String name;

    @Value("${audience.expiresSecond}")
    private int expiresSecond;

    @Autowired
    private UserMapper userMapper;


    public String login(JSONObject jsonObject, String ip) {
        String name = (String) jsonObject.get("userName");
        String pas = (String) jsonObject.get("password");
        if (StringUtils.isEmpty(name) || StringUtils.isEmpty(pas)) {
            return JSONObject.toJSONString(ServiceUtil.returnError("用户名或密码不能为空!"));
        }
        try {
            User user = new User(name, pas, "1", true);
            User userInfo = userMapper.selectBySelectiveFields(user);
            if (userInfo == null) {
                return JSONObject.toJSONString(ServiceUtil.returnError("用户名密码错误!"));
            }
            Date begingTime = new Date();
            String jwtToken = JwtHelper.createJWT(userInfo.getUserName(), userInfo.getId(), clientId,
                    name, expiresSecond * 1000, base64Secret, userMapper);
            Date endTime = new Date();
            logger.info("get token use time:{}", endTime.getTime() - begingTime.getTime());
            return JSONObject.toJSONString(ServiceUtil.returnSuccess(jwtToken));
        } catch (Exception e) {
            logger.error("user login get error,info{}" + e);
            return JSONObject.toJSONString(ServiceUtil.returnError("系统异常，请稍后再试!"));
        }

    }

    public String getUserMenu(String userId) {
        try {
            List<Map<String, Object>> menus = userMapper.getUserMenuByUserId(userId);
            return JSONObject.toJSONString(ServiceUtil.returnSuccessData(CommUtil.getfatherNode(menus)));
        } catch (Exception e) {
            logger.error("userid=" + userId + " getUserMenu get error,info{}" + e);
            return JSONObject.toJSONString(ServiceUtil.returnError(e.toString()));
        }
    }


    public String getUserDetail(Map<String, Object> map) {
        PageHelper.startPage(Integer.parseInt(map.get("pageNo") + ""),
                Integer.parseInt(map.get("pageSize") + ""));
        List<User> list = userMapper.getUserDetail(map);
        PageInfo<User> pageInfo = new PageInfo<>(list);
        return JSONObject.toJSONString(ServiceUtil.returnSuccessData(pageInfo));
    }

    public String getAllUser() {
        List<User> list = userMapper.getUserDetail(new HashMap<>());
        return JSONObject.toJSONString(ServiceUtil.returnSuccessWithData(list));
    }

    public String insertSelective(User user) {
        //检查是否有重名
        User userParams = new User();
        userParams.setUserName(user.getUserName());
        User userDb = userMapper.selectBySelectiveFields(userParams);
        if (userDb != null) {
            return JSONObject.toJSONString(ServiceUtil.returnError("此登录名已存在"));
        } else {
            if ("启用".equals(user.getStatus())) {
                user.setStatus("1");
            }
            if ("禁用".equals(user.getStatus())) {
                user.setStatus("0");
            }
            userMapper.insertSelective(user);
            return JSONObject.toJSONString(ServiceUtil.returnSuccess());
        }
    }

    public void updateByPrimaryKeySelective(User user) {
        if ("启用".equals(user.getStatus())) {
            user.setStatus("1");
        }
        if ("禁用".equals(user.getStatus())) {
            user.setStatus("0");
        }
        userMapper.updateByPrimaryKeySelective(user);
    }

}
