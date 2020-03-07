package com.gao.channelweb.controller;


import com.alibaba.fastjson.JSONObject;
import com.gao.channelcore.business.service.SchoolService;
import com.gao.channelcore.business.service.ScoreService;
import com.gao.channelcore.business.service.UserService;
import com.gao.channelcore.pojo.School;
import com.gao.channelcore.pojo.Score;
import com.gao.channelcore.utils.ServiceUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Map;


@RequestMapping("source")
@Controller
public class SchoolController {
    @Autowired
    private SchoolService schoolService;
    @Autowired
    private ScoreService scoreService;
    @Autowired
    private UserService userService;



    @RequestMapping("getSchoolDetail")
    @ResponseBody
    public String getSchoolDetail(@RequestParam Map<String, Object> map) {

        //处理前端排序字段  前端传入的为ascend descend
        if (map.containsKey("sortOrder") && map.get("sortOrder") != null) {
            String order = map.get("sortOrder").toString().split("end")[0];
            map.put("sortOrder", order);
        }
        return schoolService.getSchoolDetail(map);
    }

    @RequestMapping("insertSchool")
    @ResponseBody
    public String insertSchool(@RequestBody School school) {
        //校验是否存在同名的学校
        List<School> list = schoolService.selectSchoolByParams(school);
        if (list != null && list.size() > 0) {
            return JSONObject.toJSONString(ServiceUtil.returnError("此学校名称已存在！"));
        }
        schoolService.insertSchool(school);
        return JSONObject.toJSONString(ServiceUtil.returnSuccess());
    }

    @RequestMapping("getSchools")
    @ResponseBody
    public String getSchools() {
        List<School> list = schoolService.selectSchoolByParams(new School());
        return JSONObject.toJSONString(ServiceUtil.returnSuccessWithData(list));
    }
    @RequestMapping("getLatestSchoolId")
    @ResponseBody
    public String getLatestSchoolId() {
        Score score = scoreService.getLatestSchoolId();
        return JSONObject.toJSONString(ServiceUtil.returnSuccessWithData(score.getSchoolId()));
    }

    @RequestMapping("delSchool")
    @ResponseBody
    public String delSchool(@RequestParam Integer id) {
        School school = new School();
        school.setId(id);
        school.setIsactive(false);
        schoolService.updateByPrimaryKeySelective(school);
        return JSONObject.toJSONString(ServiceUtil.returnSuccess());
    }

    @RequestMapping("getScoreDetail")
    @ResponseBody
    public String getScoreDetail(@RequestParam Map<String, Object> map) {

        //处理前端排序字段  前端传入的为ascend descend
        if (map.containsKey("sortOrder") && map.get("sortOrder") != null) {
            String order = map.get("sortOrder").toString().split("end")[0];
            map.put("sortOrder", order);
        }
        if (map.containsKey("sortField") && "".equals(map.get("sortOrder"))) {
            if ("".equals(map.get("createAdPlanCount"))) {
                map.put("sortField", "t1.createAdPlanCount");
            }
        }
        return scoreService.getScoreDetail(map);
    }

    @RequestMapping("insertScore")
    @ResponseBody
    public String insertScore(@RequestBody Score score) {
        //schoolService.insertSchool(school);
        scoreService.insertSelective(score);
        return JSONObject.toJSONString(ServiceUtil.returnSuccess());
    }

    @RequestMapping("delScore")
    @ResponseBody
    public String delScore(@RequestParam Integer id) {
        Score score = new Score();
        score.setId(id);
        score.setIsactive(false);
        scoreService.updateByPrimaryKeySelective(score);
        return JSONObject.toJSONString(ServiceUtil.returnSuccess());
    }

    @RequestMapping("updateScore")
    @ResponseBody
    public String updateScore(@RequestBody Score score) {
        //schoolService.insertSchool(school);
        scoreService.updateByPrimaryKeySelective(score);
        return JSONObject.toJSONString(ServiceUtil.returnSuccess());
    }

    @RequestMapping("exportScore")
    @ResponseBody
    public String exportScore(@RequestParam Map map, HttpServletResponse response) {
        scoreService.exportExcel(response, map);
        return JSONObject.toJSONString(ServiceUtil.returnSuccess());
    }

}
