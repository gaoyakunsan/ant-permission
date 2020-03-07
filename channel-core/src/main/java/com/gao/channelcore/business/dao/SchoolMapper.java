package com.gao.channelcore.business.dao;

import com.gao.channelcore.pojo.School;

import java.util.List;
import java.util.Map;

public interface SchoolMapper {

    int deleteByPrimaryKey(Integer id);

    int insert(School record);

    int insertSelective(School record);

    School selectByPrimaryKey(Integer id);

    List<School> selectSchoolByParams(School record);

    int updateByPrimaryKeySelective(School record);

    int updateByPrimaryKey(School record);

    List<School> getSchoolDetail(Map<String, Object> map);
}