package com.gao.channelcore.utils;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.naming.Context;
import javax.naming.directory.DirContext;
import javax.naming.directory.InitialDirContext;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Hashtable;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class CommUtil {

    private static final Logger logger = LoggerFactory.getLogger(CommUtil.class);


    /**
     * 把传入参数拼接到url后面 如：https://test-ad.toutiao.com/open_api/2/report/creative/get/?advertiser_id=3047467756820215&start_date=2019-02-07
     */
    public static String appendUrl(String url, Map<String, Object> map) {

        if (map == null || map.size() == 0) {
            return url;
        }
        StringBuffer sbf = new StringBuffer();
        map.forEach((k, v) -> sbf.append("&").append(k).append("=").append(v));
        String params = sbf.toString();
        //把第一个&替换为?
        String urlTmp = url + "?" + params.substring(1, params.length());
        return urlTmp;
    }

    /**
     * 把传入参数拼接到url后面 并encode参数 如：https://test-ad.toutiao.com/open_api/2/report/creative/get/?advertiser_id=3047467756820215&start_date=2019-02-07
     */
    public static String appendUrlEncode(String url, Map<String, Object> map) {

        if (map == null || map.size() == 0) {
            return url;
        }
        StringBuffer sbf = new StringBuffer();
        map.forEach((k, v) -> sbf.append("&").append(k).append("=")
                .append(URLEncoder.encode(String.valueOf(v))));
        String params = sbf.toString();
        //把第一个&替换为?
        String urlTmp = url + "?" + params.substring(1, params.length());
        return urlTmp;
    }



    /**
     * @Title: getfatherNode
     * @Description 方法描述: 父节点
     */
    public final static List<Map<String, Object>> getfatherNode(
            List<Map<String, Object>> treeDataList) {
        List<Map<String, Object>> newTreeDataList = new ArrayList<Map<String, Object>>();
        for (Map<String, Object> jsonTreeData : treeDataList) {
            if (jsonTreeData.get("parentId") == null
                    || Integer.parseInt(jsonTreeData.get("parentId") + "") == 0) {
                // 获取父节点下的子节点
                jsonTreeData.put("children",
                        getChildrenNode(Integer.parseInt(jsonTreeData.get("id") + ""), treeDataList));
                newTreeDataList.add(jsonTreeData);
            }
        }

        return newTreeDataList;
    }

    /**
     * @Title: getChildrenNode
     * @Description 方法描述: 子节点
     */
    public final static List<Map<String, Object>> getChildrenNodeByTree(Integer pid,
        List<Map<String, Object>> treeDataList) {
        List<Map<String, Object>> newTreeDataList = new ArrayList<Map<String, Object>>();
        for (Map<String, Object> jsonTreeData : treeDataList) {
            if (jsonTreeData.get("parentKey") == null) {
                continue;
            }
            // 这是一个子节点
            if (jsonTreeData.get("parentKey").equals(pid)) {
                // 递归获取子节点下的子节点
                jsonTreeData.put("children",
                    getChildrenNodeByTree(Integer.parseInt(jsonTreeData.get("key") + ""), treeDataList));
                newTreeDataList.add(jsonTreeData);
            }
        }

        return newTreeDataList;
    }

    private final static List<Map<String, Object>> getChildrenNode(Integer pid,
        List<Map<String, Object>> treeDataList) {
        List<Map<String, Object>> newTreeDataList = new ArrayList<Map<String, Object>>();
        for (Map<String, Object> jsonTreeData : treeDataList) {
            if (jsonTreeData.get("parentId") == null) {
                continue;
            }
            // 这是一个子节点
            if (jsonTreeData.get("parentId").equals(pid)) {
                // 递归获取子节点下的子节点
                jsonTreeData.put("children",
                    getChildrenNode(Integer.parseInt(jsonTreeData.get("id") + ""), treeDataList));
                newTreeDataList.add(jsonTreeData);
            }
        }

        return newTreeDataList;
    }

    public static List<String> duplicates(List<String> list) {
        List<String> listReturn = new ArrayList<>();
        if (list == null || list.size() == 0) {
            return listReturn;
        }
        listReturn = list.stream().distinct().collect(Collectors.toList());
        return listReturn;
    }

    public static void main(String[] args) {
        List<String> list = new ArrayList<>();
        list.add(0, "1602520071084083");
        list.add(1, "1602520071084083");
        list.add(2, "1602520071084083");
        list.add(3, "1602531925638147");
        list.add(4, "1602531925638147");
        List<String> list11 = duplicates(list);
        for (String str : list11) {
            System.out.println(str);
        }

    }

}
