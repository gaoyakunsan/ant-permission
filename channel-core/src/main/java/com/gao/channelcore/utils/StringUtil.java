package com.gao.channelcore.utils;

import com.gao.channelcore.cons.Constant;
import java.util.Calendar;
import java.util.Date;
import java.util.HashSet;
import java.util.UUID;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class StringUtil {


  public static String getVideoJobName(String videoId) {

    return Constant.JOB_KEY_TOUTIAO + "_" + videoId;

  }

  //去除换行符
  public static String replaceSpecialStr(String str) {
    String repl = "";
    if (str != null) {
      Pattern p = Pattern.compile("\r|\n");
      Matcher m = p.matcher(str);
      repl = m.replaceAll("");
    }
    return repl;
  }

  //去除空格换行符
  public static String replaceAllBlank(String str) {
    String s = "";
    if (str != null) {
      Pattern p = Pattern.compile("\\s*|\t|\r|\n");
      Matcher m = p.matcher(str);
      s = m.replaceAll("");
    }
    return s;
  }

  public static String getTimestamp() {
    Date date = new Date();
    String timestamp = String.valueOf(date.getTime());
    int length = timestamp.length();
    return timestamp.substring(0, length - 3);
  }

  public static String getUUID() {
    String uuid = UUID.randomUUID().toString().replaceAll("-", "");
    return uuid;
  }

  public static String getCampaignName(String advertiserId) {
    String name =
        advertiserId + "-" + DateUtil.getCurrentTimeStr() + "-" + System.currentTimeMillis()
            + "-章鱼";
    return name;
  }

  public static String getAdvretiserName(String advertiserId, String sourceid) {
    String name = advertiserId + "-" + DateUtil.getCurrentTimeStr() + "-" + sourceid + "-" + System
        .currentTimeMillis() + "-章鱼";
    return name;
  }

  public static boolean isNumeric(String str) {
    Pattern pattern = Pattern.compile("[0-9]*");
    return pattern.matcher(str).matches();
  }

  //判断对象是否为空
  public static boolean isEmpty(String obj) {
    if (obj == null || "".equals(obj)) {
      return true;
    } else {
      return false;
    }
  }

  public static String replaceNonce(String url) {
    return url.replaceAll("nonce=(?!(?:\\d+|[a-zA-Z]+)$)[\\da-zA-Z]{32}",
        "nonce=" + StringUtil.getUUID());
  }

  public static boolean isAgentAccount(String advertiserId) {
    String[] strArr = Constant.agentAccount.split(",");
    boolean bl = false;
    for (int i = 0; i < strArr.length; i++) {
      if (strArr[i].equals(advertiserId)) {
        bl = true;
        break;
      }
    }
    return bl;
  }

  public static String getCronExpression(String time) {
    String hour = time.split(":")[0];
    if (hour.length() == 1) {
      hour = "0" + hour;
    }
    if ("0".equals(hour.substring(0, 1))) {
      hour = hour.substring(1, 2);
    }
    String minute = time.split(":")[1];
    if (minute.length() == 1) {
      minute = "0" + minute;
    }
    if ("0".equals(minute.substring(0, 1))) {
      minute = minute.substring(1, 2);
    }
    return "0 " + minute + " " + hour + " * * ?";
  }

  public static String getAccurateCronExpression(String time) throws Exception {
    Date date = DateUtil.parseDate(time, "yyyy-MM-dd HH:mm:ss");
    Calendar cal = Calendar.getInstance();
    cal.setTime(date);
    int year = cal.get(Calendar.YEAR);
    int month = cal.get(Calendar.MONTH) + 1;
    int day = cal.get(Calendar.DATE);
    int hour = cal.get(Calendar.HOUR_OF_DAY);
    int minute = cal.get(Calendar.MINUTE);
    int seconds = cal.get(Calendar.SECOND);
    return seconds + " " + minute + " " + hour + " " + day + " " + month + " ? " + year;
  }

  public static boolean cheakIsRepeat(String[] array) {
    HashSet<String> hashSet = new HashSet<String>();
    for (int i = 0; i < array.length; i++) {
      hashSet.add(array[i]);
    }
    if (hashSet.size() == array.length) {
      return true;
    } else {
      return false;
    }
  }

  public static String getAdPlanKey(String adId, String type) {
    return "toutiao:" + adId + ":" + type;
  }


}
