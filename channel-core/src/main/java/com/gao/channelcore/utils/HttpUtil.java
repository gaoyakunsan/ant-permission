package com.gao.channelcore.utils;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;
import org.apache.http.HttpEntity;
import org.apache.http.NameValuePair;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class HttpUtil {

  private static Logger logger = LoggerFactory.getLogger(HttpUtil.class);

  public static String doGet(String url, Map<String, Object> header) throws Exception {

    CloseableHttpClient httpClient = null;
    CloseableHttpResponse response = null;
    String result = "";
    int code = 0;
    try {
      // 通过址默认配置创建一个httpClient实例
      httpClient = HttpClients.createDefault();
      // 创建httpGet远程连接实例
      HttpGet httpGet = new HttpGet(url);
      // 设置请求头信息
      if (header != null && header.size() > 0) {
        header.forEach((k, v) -> httpGet.setHeader(k, v.toString()));
      }
      // 设置配置请求参数
      RequestConfig requestConfig = RequestConfig.custom().setConnectTimeout(30000)// 连接主机服务超时时间
          .setConnectionRequestTimeout(30000)// 请求超时时间
          .setSocketTimeout(30000)// 数据读取超时时间
          .build();
      // 为httpGet实例设置配置
      httpGet.setConfig(requestConfig);
      // 执行get请求得到返回对象
      for (int i = 0; i < 3; i++) {
        response = httpClient.execute(httpGet);
        // 通过返回对象获取返回数据
        code = response.getStatusLine().getStatusCode();
        if (code != 200) {
          continue;
        } else {
          break;
        }
      }
      HttpEntity entity = response.getEntity();
      // 通过EntityUtils中的toString方法将结果转换为字符串
      result = EntityUtils.toString(entity);
    } catch (IOException e) {
      logger.error("doGet error,code:{}, url:{}, error info:{}", code, url, e.toString());
      throw new Exception("code:" + code + e);
    } finally {
      // 关闭资源
      if (null != response) {
        try {
          response.close();
        } catch (IOException e) {
          e.printStackTrace();
        }
      }
      if (null != httpClient) {
        try {
          httpClient.close();
        } catch (IOException e) {
          e.printStackTrace();
        }
      }
    }
    return result;
  }

 /* public static HttpResModel doGetMap(String url, Map<String, Object> header,
      Map<String, Object> param) {
    HttpResModel httpResModel = new HttpResModel();
    for (int i = 0; i < 4; i++) {
      // 创建Httpclient对象
      CloseableHttpClient httpclient = HttpClients.createDefault();
      String resultString = "";
      CloseableHttpResponse response = null;
      int code = 0;
      try {
        // 创建uri
        URIBuilder builder = new URIBuilder(url);
        if (param != null) {
          for (String key : param.keySet()) {
            builder.addParameter(key, String.valueOf(param.get(key)));
          }
        }
        URI uri = builder.build();
        // 创建http GET请求
        HttpGet httpGet = new HttpGet(uri);
        // 设置请求头信息
        if (header != null && header.size() > 0) {
          header.forEach((k, v) -> httpGet.setHeader(k, v.toString()));
        }
        response = httpclient.execute(httpGet);
        // 通过返回对象获取返回数据
        code = response.getStatusLine().getStatusCode();
        HttpEntity entity = response.getEntity();
        // 通过EntityUtils中的toString方法将结果转换为字符串
        resultString = EntityUtils.toString(entity);
      } catch (Exception e) {
        logger.error("doGetMap error,code:{}, url:{}, error info:{}", code, url, e.toString());
        httpResModel.setErrormsg("code:" + code + "," + e.toString());
        //throw new Exception("code:" + code + e);
      } finally {
        try {
          if (response != null) {
            response.close();
          }
          if(httpclient != null){
            httpclient.close();
          }
        } catch (IOException e) {
          e.printStackTrace();
        }
      }
      httpResModel.setCode(code);
      httpResModel.setResponseStr(resultString);
      //如果请求返回200 跳出循环
      if (code == 200) {
        break;
      } else {
        continue;
      }
    }
    return httpResModel;
  }*/

  public static String doPostMap(String url, Map<String, Object> paramMap) throws Exception {
    CloseableHttpClient httpClient = null;
    CloseableHttpResponse httpResponse = null;
    String result = "";
    // 创建httpClient实例
    httpClient = HttpClients.createDefault();
    // 创建httpPost远程连接实例
    HttpPost httpPost = new HttpPost(url);
    // 配置请求参数实例
    RequestConfig requestConfig = RequestConfig.custom().setConnectTimeout(30000)// 设置连接主机服务超时时间
        .setConnectionRequestTimeout(30000)// 设置连接请求超时时间
        .setSocketTimeout(30000)// 设置读取数据连接超时时间
        .build();
    // 为httpPost实例设置配置
    httpPost.setConfig(requestConfig);
    // 设置请求头
    httpPost.addHeader("Content-Type", "application/x-www-form-urlencoded");
    // 封装post请求参数
    try {
      if (null != paramMap && paramMap.size() > 0) {
        List<NameValuePair> nvps = new ArrayList<NameValuePair>();
        // 通过map集成entrySet方法获取entity
        Set<Entry<String, Object>> entrySet = paramMap.entrySet();
        // 循环遍历，获取迭代器
        Iterator<Entry<String, Object>> iterator = entrySet.iterator();
        while (iterator.hasNext()) {
          Entry<String, Object> mapEntry = iterator.next();
          nvps.add(new BasicNameValuePair(mapEntry.getKey(), mapEntry.getValue().toString()));
        }
        // 为httpPost设置封装好的请求参数
        httpPost.setEntity(new UrlEncodedFormEntity(nvps, "UTF-8"));
      }
      // httpClient对象执行post请求,并返回响应参数对象
      httpResponse = httpClient.execute(httpPost);
      // 从响应对象中获取响应内容
      HttpEntity entity = httpResponse.getEntity();
      result = EntityUtils.toString(entity);
    } catch (IOException e) {
      logger.error("dopostmap error, url:{}, error info: {}", url, e.toString());
      throw new Exception(e);
    } finally {
      // 关闭资源
      if (null != httpResponse) {
        try {
          httpResponse.close();
        } catch (IOException e) {
          e.printStackTrace();
        }
      }
      if (null != httpClient) {
        try {
          httpClient.close();
        } catch (IOException e) {
          e.printStackTrace();
        }
      }
    }
    return result;
  }


  public static String doPostJson(String url, String str) throws Exception {
    CloseableHttpClient httpClient = null;
    CloseableHttpResponse httpResponse = null;
    String result = "";
    // 创建httpClient实例
    httpClient = HttpClients.createDefault();
    // 创建httpPost远程连接实例
    HttpPost httpPost = new HttpPost(url);
    // 配置请求参数实例
    RequestConfig requestConfig = RequestConfig.custom().setConnectTimeout(30000)// 设置连接主机服务超时时间
        .setConnectionRequestTimeout(30000)// 设置连接请求超时时间
        .setSocketTimeout(30000)// 设置读取数据连接超时时间
        .build();
    // 为httpPost实例设置配置
    httpPost.setConfig(requestConfig);
    // 设置请求头
    httpPost.addHeader("Content-Type", "application/json");
    // 封装post请求参数
    try {
      httpPost.setEntity(new StringEntity(str, "UTF-8"));
      // httpClient对象执行post请求,并返回响应参数对象
      httpResponse = httpClient.execute(httpPost);
      // 从响应对象中获取响应内容
      HttpEntity entity = httpResponse.getEntity();
      result = EntityUtils.toString(entity);
    } catch (IOException e) {
      logger.error("dopostjson error, url:{}, error info:{}", url, e.toString());
      throw new Exception(e);
    } finally {
      // 关闭资源
      if (null != httpResponse) {
        try {
          httpResponse.close();
        } catch (IOException e) {
          e.printStackTrace();
        }
      }
      if (null != httpClient) {
        try {
          httpClient.close();
        } catch (IOException e) {
          e.printStackTrace();
        }
      }
    }
    return result;
  }


  public static String doPostJson(String url,String head, String str) throws Exception {
    CloseableHttpClient httpClient = null;
    CloseableHttpResponse httpResponse = null;
    String result = "";
    // 创建httpClient实例
    httpClient = HttpClients.createDefault();
    // 创建httpPost远程连接实例
    HttpPost httpPost = new HttpPost(url);
    // 配置请求参数实例
    RequestConfig requestConfig = RequestConfig.custom().setConnectTimeout(30000)// 设置连接主机服务超时时间
        .setConnectionRequestTimeout(30000)// 设置连接请求超时时间
        .setSocketTimeout(30000)// 设置读取数据连接超时时间
        .build();
    // 为httpPost实例设置配置
    httpPost.setConfig(requestConfig);
    httpPost.addHeader("Access-Token", head);
    // 设置请求头
    httpPost.addHeader("Content-Type", "application/json");
    // 封装post请求参数
    int code = 0;
    try {
      httpPost.setEntity(new StringEntity(str, "UTF-8"));
      // httpClient对象执行post请求,并返回响应参数对象
      for (int i = 0; i < 3; i++) {
        httpResponse = httpClient.execute(httpPost);
        code = httpResponse.getStatusLine().getStatusCode();
        if (code != 200) {
          continue;
        } else {
          break;
        }
      }
      // 从响应对象中获取响应内容
      HttpEntity entity = httpResponse.getEntity();
      result = EntityUtils.toString(entity);
    } catch (IOException e) {
      logger.error("dopostjson error, url:{},code:{}, error info:{}", url, code,e.toString());
      throw new Exception(e);
    } finally {
      // 关闭资源
      if (null != httpResponse) {
        try {
          httpResponse.close();
        } catch (IOException e) {
          e.printStackTrace();
        }
      }
      if (null != httpClient) {
        try {
          httpClient.close();
        } catch (IOException e) {
          e.printStackTrace();
        }
      }
    }
    return result;
  }

}
