package com.gao.channelcore.business.service;

import com.alibaba.fastjson.JSONObject;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.gao.channelcore.business.dao.SchoolMapper;
import com.gao.channelcore.pojo.School;
import com.gao.channelcore.utils.ServiceUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class SchoolService {

    @Autowired
    private SchoolMapper schoolMapper;

    public String getSchoolDetail(Map<String, Object> map) {
        PageHelper.startPage(Integer.parseInt(map.get("pageNo") + ""),
                Integer.parseInt(map.get("pageSize") + ""));
        List<School> list = schoolMapper.getSchoolDetail(map);
        PageInfo<School> pageInfo = new PageInfo<>(list);
        return JSONObject.toJSONString(ServiceUtil.returnSuccessData(pageInfo));
    }

    public void insertSchool(School school){
        schoolMapper.insertSelective(school);
    }

    public List<School> selectSchoolByParams(School school){
        return schoolMapper.selectSchoolByParams(school);
    }

    public void deleteByPrimaryKey(Integer id){
        schoolMapper.deleteByPrimaryKey(id);
    }

    public void updateByPrimaryKeySelective(School school){
        schoolMapper.updateByPrimaryKeySelective(school);
    }
}
