package com.gao.channelcore.utils;

import com.alibaba.fastjson.JSONObject;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class DateUtil {

  private static Logger logger = LoggerFactory.getLogger(DateUtil.class);

  //获取当前时间前一天日期
  public static String getBeforDay() {
    Calendar ca = Calendar.getInstance();
    ca.setTime(new Date());
    ca.add(Calendar.DATE, -1);
    Date date = ca.getTime();
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
    return sdf.format(date);
  }

  //获取当前时间前某天的日期
  public static String getSomeBeforDay(int date) {
    Calendar ca = Calendar.getInstance();
    ca.setTime(new Date());
    ca.add(Calendar.DATE, -date);
    Date dt = ca.getTime();
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
    return sdf.format(dt);
  }

  //获取当前时间前某天的日期精确到小时
  public static String getSomeAfterDayExactMinute(int date) {
    Calendar ca = Calendar.getInstance();
    ca.setTime(new Date());
    ca.add(Calendar.DATE, date);
    Date dt = ca.getTime();
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
    return sdf.format(dt) + " 00:00";
  }

  /**
   * 获取开始时间,结束时间之间的日期
   *
   * @param beginDay "2019-03-27"
   * @param endDay "2019-04-01"
   * @return 2019-03-27,2019-03-28,2019-03-29,2019-03-30,2019-03-31,2019-04-01
   */
  public static String getBetweenDay(String beginDay, String endDay) {
    SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
    StringBuffer sbf = new StringBuffer(beginDay);
    if (StringUtil.isEmpty(beginDay) || StringUtil.isEmpty(endDay)) {
      return "";
    }
    try {
      Date beginDate = format.parse(beginDay);
      Date endDate = format.parse(endDay);
      long endTime = endDate.getTime();
      while (true) {
        Calendar ca = Calendar.getInstance();
        ca.setTime(beginDate);
        ca.add(Calendar.DATE, 1);
        beginDate = ca.getTime();
        long beginTime = ca.getTime().getTime();
        if (endTime - beginTime >= 0) {
          sbf.append(",").append(format.format(beginDate));
        } else {
          break;
        }
      }
    } catch (ParseException e) {
      logger.error("getBetweenDay error:{}", e.toString());
    }
    return sbf.toString();
  }

  /**
   * 获取当前时间前1个小时的天
   */
  public static String getBeforOneHourDay() {
    SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
    Calendar ca = Calendar.getInstance();
    ca.setTime(new Date());
    ca.add(Calendar.HOUR, -1);
    String date = format.format(ca.getTime());
    return date;
  }

  /**
   * 判断时间是否在2天之内  true:在2天之内 false：不在2天之内
   */
  public static boolean isBetweenTwoDay(String date) {
    boolean bl = false;
    Date nowDate = new Date();
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    Date T1TimeDate = null;
    try {
      T1TimeDate = sdf.parse(date);
    } catch (ParseException e) {
      e.printStackTrace();
    }
    long T1 = nowDate.getTime() - T1TimeDate.getTime();
    if (T1 > 0 && T1 < 48 * 60 * 60 * 1000) {
      bl = true;
    }
    return bl;
  }

  /**
   * 判断时间是否在1小时之内  true:在1小时之内 false：不在1小时之内
   */
  public static boolean isMoreThanOneHour(String date) {
    boolean bl = false;
    Date nowDate = new Date();
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    Date T1TimeDate = null;
    try {
      T1TimeDate = sdf.parse(date);
    } catch (ParseException e) {
      e.printStackTrace();
    }
    long T1 = T1TimeDate.getTime() - nowDate.getTime();
    if (T1 > 1 * 60 * 60 * 1000) {
      bl = true;
    }
    return bl;
  }

  /**
   * 获取当前时间某个小时的天
   */
  public static String getBeforSomeHourDay(int hour) {
    SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
    Calendar ca = Calendar.getInstance();
    ca.setTime(new Date());
    ca.add(Calendar.HOUR, -hour);
    String date = format.format(ca.getTime());
    return date;
  }

  public static String getCurrentDay() {
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
    Date date = new Date();
    return sdf.format(date);
  }

  public static String getCurrentTimeStr() {
    SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
    Date date = new Date();
    return sdf.format(date);
  }

  public static String getSomeHourBeforTime(Integer hour) {
    SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    Calendar ca = Calendar.getInstance();
    ca.setTime(new Date());
    ca.add(Calendar.HOUR, -hour);
    String date = format.format(ca.getTime());
    return date;
  }

  public static String getSomeMinuteBeforTime(Integer minute) {
    SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    Calendar ca = Calendar.getInstance();
    ca.setTime(new Date());
    ca.add(Calendar.MINUTE, -minute);
    String date = format.format(ca.getTime());
    return date;
  }

  public static String Date2TimeStamp(String dateStr) {
    try {
      SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
      return String.valueOf(sdf.parse(dateStr).getTime() / 1000);
    } catch (Exception e) {
      e.printStackTrace();
    }
    return "";
  }

  public static Long Date2TimeStampLong(String dateStr) {
    try {
      SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
      return Long.valueOf(sdf.parse(dateStr).getTime() / 1000);
    } catch (Exception e) {
      e.printStackTrace();
    }
    return 0L;
  }

  public static String test() {
    //2019-04-12 01:05:00
    SimpleDateFormat ft = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
    Calendar ca = Calendar.getInstance();
    //ft.
    try {
      ca.setTime(ft.parse("2019-04-11 00:05:00"));
    } catch (ParseException e) {
      e.printStackTrace();
    }
    ca.add(Calendar.HOUR, -1);
    String date = format.format(ca.getTime());
    return date;
  }

  public static Date parseDate(String time, String formatter) throws Exception {
    SimpleDateFormat ds = new SimpleDateFormat(formatter);
    return ds.parse(time);
  }

  public static boolean compareNow(String time) throws ParseException {
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
    Date a = sdf.parse(time);
    Date b = new Date();
    if (a.before(b)) {
      return true;
    } else {
      return false;
    }
  }

  public static boolean compareTwoTime(String pre, String ne) throws ParseException {
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    Date a = sdf.parse(pre);
    Date b = sdf.parse(ne);
    if (a.before(b)) {
      return true;
    } else {
      return false;
    }
  }


  public static boolean compareTime(JSONObject jsonObject) throws ParseException {
    boolean result = true;
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    String time = "2019-01-01 " + jsonObject.getString("offlineTime") + ":00";
    Date pre = sdf.parse(time);
    String[] realTimeHour = jsonObject.getString("realTimeHour").split(";");
    String[] realTimeMinute = jsonObject.getString("realTimeMinute").split(";");
    for (String hour : realTimeHour) {
      for (String minute : realTimeMinute) {
        String current = "2019-01-01 " + hour + ":" + minute + ":00";
        Date ne = sdf.parse(current);
        if (!pre.before(ne)) {
          result = false;
          break;
        }
      }
      if (!result) {
        break;
      }
    }
    return result;
  }

  //2019-11-05    0 0 18 06 11 ?
  public static String getCorn(String time) {

    String moun = time.substring(5, 7);
    String day = time.substring(8, 10);

    String corn = "0 0 " + "01 " + day + " " + moun + " ?";

    return corn;
  }


  public static String getDataTime() {
    Calendar c = Calendar.getInstance();
    c.setTime(new Date());
    int year = c.get(Calendar.YEAR);
    int month = c.get(Calendar.MONTH) + 1;
    int date = c.get(Calendar.DATE);
    int hour = c.get(Calendar.HOUR_OF_DAY);
    int min = c.get(Calendar.MINUTE);
    String m = "";
    if (min < 30) {
      m = "00";
    } else {
      m = "00";
    }
    return year + "-" + (month < 10 ? ("0" + month) : month) + "-" + (date < 10 ? ("0" + date)
        : date) + " " + (hour < 10 ? ("0" + hour) : hour) + ":" + m + ":00";
  }

  public static String getDt() {
    SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
    return df.format(new Date());
  }

  /**
   * time2 - time1
   *//*
  public static int daysOfTwo(String time1, String time2) {
    int days = 0;
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
    //跨年不会出现问题
    //如果时间为：2016-03-18 11:59:59 和 2016-03-19 00:00:01的话差值为 0
    try {
      Date fDate = sdf.parse(time1);
      Date oDate = sdf.parse(time2);
      days = (int) (oDate.getTime() - fDate.getTime()) / (1000 * 3600 * 24);
    } catch (ParseException e) {
      e.printStackTrace();
    }
    return days;
  }*/
  public static int differentDays(String date1Str, String date2Str) {
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    Date date1 = null;
    Date date2 = null;
    try {
      date1 = sdf.parse(date1Str);
      date2 = sdf.parse(date2Str);
    } catch (ParseException e) {
      e.printStackTrace();
    }

    Calendar cal1 = Calendar.getInstance();
    cal1.setTime(date1);

    Calendar cal2 = Calendar.getInstance();
    cal2.setTime(date2);
    int day1 = cal1.get(Calendar.DAY_OF_YEAR);
    int day2 = cal2.get(Calendar.DAY_OF_YEAR);

    int year1 = cal1.get(Calendar.YEAR);
    int year2 = cal2.get(Calendar.YEAR);
    if (year1 != year2)   //同一年
    {
      int timeDistance = 0;
      for (int i = year1; i < year2; i++) {
        if (i % 4 == 0 && i % 100 != 0 || i % 400 == 0)    //闰年
        {
          timeDistance += 366;
        } else    //不是闰年
        {
          timeDistance += 365;
        }
      }

      return timeDistance + (day2 - day1);
    } else    //不同年
    {
      return day2 - day1;
    }
  }

  public static void main(String[] args) {
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    /*String newDate = sdf.format(new Date());
    int day = differentDays("2019-01-01 23:59:59", "2019-01-02 00:00:00");
    System.out.println(day);*/
    /*String sql = "select channel_id channelId,\n"
        + "           channel_source_id sourceId\n"
        + "       from edw.dim_channel\n"
        + "       where channel_id = %s and insert_time > days_sub(now(), 2)";
    String str1 = String.format(sql, 11111);
    System.out.println(str1);*/
    //String str111 = getCronByDateInfo("2020-12-08 20:22:27");
    //System.out.println(str111);
    /*List<String> lsitmsg = new ArrayList<>();
    lsitmsg.add("广告主模板不存在");
    lsitmsg.add("视频图片横宽屏等信息没有配置");
    String srt = ServiceUtil.returnSuccess(lsitmsg, "success");
    JSONObject responseObj = JSONObject.parseObject(srt);
    String msg = responseObj.getString("data");*/

    boolean bl = isBetweenTwoDay("2019-12-22 18:01:00");
    System.out.println(bl);

    //String str = ServiceUtil.returnErrorMsg("广告主模板不存在");
    //String str = getSomeAfterDayExactMinute(2);
    /*String externalUrlTmp = "";

    String[] include = externalUrlTmp.split("\\|");
    System.out.println(include.toString());
    JSONArray jsonObj = (JSONArray) JSONArray.toJSON(include);*/
    /*String[] videoArr = "111111,222222".split(",");
    String[] advertiserIdArr = "33333".split(",");
    String msg = "";
    for (String videoId : videoArr) {
      for (String advertiserId : advertiserIdArr) {
        JSONArray data = new JSONArray();
        data.add("广告计划创建成功");
        data.add("广告组创建成功");
        data.add("创意创建成功");
        String info = "广告主:" + advertiserId + ",videoId:" + videoId + ",";
        for (Object object : data) {
          info = info + object.toString() + ",";
        }
        msg = msg + info + "||";
      }
    }*/

    String str = getCorn("2019-12-02");

    //System.out.println(str);

    //判断是否在禁止刷新时间段内
    Date nowDate = new Date();
    //SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

    String T1Time = DateUtil.getCurrentDay() + " " + "13:17" + ":00";
    Date T1TimeDate = null;
    try {
      T1TimeDate = sdf.parse(T1Time);
    } catch (ParseException e) {
      e.printStackTrace();
    }
    long T1 = nowDate.getTime() - T1TimeDate.getTime();
    if (T1 < 10 * 60 * 1000) {
      //System.out.println("111");
    }

    /*SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
    Calendar ca = Calendar.getInstance();
    try {
      ca.setTime(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse("2019-05-27 01:30:00"));
    } catch (ParseException e) {
      e.printStackTrace();
    }
    ca.add(Calendar.HOUR, -2);
    String date = format.format(ca.getTime());
    System.out.println(date);*/
    /*String date = getSomeBeforDay(2);
    System.out.println(date);*/


    /*String str = getBetweenDay("2019-03-27", "2019-04-01");
    System.out.println(str);*/
    /*String str = getBeforTwoHourDay();
    System.out.println(str);*/
   /* SimpleDateFormat ft = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    String nowDay = ft.format(new Date());
    String time = getSomeHourBeforTime(4);
    System.out.println("nowDay:" + nowDay +"<----->" + "time:" + time);*/
    /*String time = Date2TimeStamp("2019-05-14 15:00:00");
    System.out.println(time);*/
    /*Calendar c = Calendar.getInstance();
    c.setTime(new Date());
    int year = c.get(Calendar.YEAR);
    int month = c.get(Calendar.MONTH) + 1;
    int date = c.get(Calendar.DATE);
    int hour = c.get(Calendar.HOUR_OF_DAY);
    int min = c.get(Calendar.MINUTE);
    String m = "";
    if (min < 30) {
      m = "00";
    } else {
      m = "30";
    }
    System.out.println(
        year + "-" + (month < 10 ? ("0" + month) : month) + "-" + (date < 10 ? ("0" + date) : date)
            + " " + (hour < 10 ? ("0" + hour) : hour) + ":" + m + ":00");*/
  }

}
