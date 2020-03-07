package com.gao.channelcore.utils;

import com.alibaba.fastjson.JSONObject;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Generic Service Utility Class
 */
public final class ServiceUtil {
    
    private ServiceUtil() {}
    
    /**
     * 获取返回结果
     * code:1
     * msg: success
     * @return
     */
    public static Map<String, Object> returnSuccess() {
        return returnMessage("1", "success");
    }

    public static Map<String, Object> returnSuccessData(Object data) {
        return returnMessageIncludeData("1", "success", data);
    }
    public static Map<String, Object> returnSuccessWithData(Object data) {
        return returnMessage("1", "success", data);
    }
    
    /** A small routine used all over to improve code efficiency, make a result map with the message and the success response code */
    public static Map<String, Object> returnSuccess(String successMessage) {
        return returnMessage("1", successMessage);
    }
    
    public static Map<String, Object> returnError() {
        return returnMessage("-1", "error");
    }
    
    public static Map<String, Object> returnError(String errorMessage) {
        return returnMessage("-1", errorMessage);
    }

    public static Map<String, Object> returnDependentError(String errorMessage) {
        return returnMessage("2", errorMessage);
    }
    
    public static Map<String, Object> returnError(String errorMessage, Exception e) {
        return returnMessage("-1", errorMessage + e.getMessage());
    }
    
    public static Map<String, Object> returnMessage(String code, String message) {
        Map<String, Object> result = new HashMap<String, Object>();
        if (code != null) result.put("code", code);
        if (message != null) result.put("msg", message);
        return result;
    }

    public static Map<String, Object> returnMessageIncludeData(String code, String message,Object data) {
        Map<String, Object> result = new HashMap<String, Object>();
        if (code != null) result.put("code", code);
        if (message != null) result.put("msg", message);
        if (data != null) result.put("data", data);
        return result;
    }

    public static Map<String, Object> returnMessage(String code, String message, Object data) {
        Map<String, Object> result = new HashMap<String, Object>();
        if (code != null) result.put("code", code);
        if (message != null) result.put("msg", message);
        if (data != null) result.put("data", data);
        return result;
    }
    
    /** 获取返回的错误信息  */
    public static String getErrorMessage(Map<String, ? extends Object> result) {
        return (String) result.get("msg");
    }
    
    /** A little short-cut method to check to see if a service returned an error */
    public static boolean isError(Map<String, ? extends Object> results) {
        if (results == null || results.get("code") == null) {
            return false;
        }
        return !"1".equals(results.get("code"));
    }
    public static String returnSuccessStrWithData(Object data) {
        return JSONObject.toJSONString(returnSuccessWithData(data));
    }
    public static String returnErrorMsg(String errorMessage) {
        return JSONObject.toJSONString(returnError(errorMessage));
    }
    public static String returnSuccessStr() {
        return JSONObject.toJSONString(returnSuccess());
    }
    public static String returnErrorStr() {
        return JSONObject.toJSONString(returnError());
    }
    public static String returnErrorMsgStr(String errorMessage, Exception e) {
        return JSONObject.toJSONString(returnError(errorMessage, e));
    }
    public static String returnErrorMsgStr(String errorMessage) {
        return JSONObject.toJSONString(returnError(errorMessage));
    }

    public static String returnSuccess(Object data, String msg){
        JSONObject jSONObject = new JSONObject();
        jSONObject.put("code", "1");
        jSONObject.put("data", data);
        jSONObject.put("msg", msg);
        return jSONObject.toString();
    }

    public static String returnError(Object data, String msg){
        JSONObject jSONObject = new JSONObject();
        jSONObject.put("code", "-1");
        jSONObject.put("data", data);
        jSONObject.put("msg", msg);
        return jSONObject.toString();
    }

    public static void main(String[] args) {
        List<String> list = new ArrayList<>();
        list.add("111111");
        list.add("222222");
      String str =  returnSuccess(list, "success");
        System.out.println(str);
    }

}
