package com.gao.channelcore.cons;

public class Constant {

  public static final Integer ADPLANKEY_EXPIRETIME = 1800; //半个小时

  public static final Integer ADPLAY_STOPCOUNT = 7 * 24 * 2;

  public static final Integer SENDING = 1;      //发送中
  public static final Integer SEND_SUCCESS = 2; //发送成功
  public static final Integer SEND_FAIL = 3;    //发送失败

  public static final String agentAccount = "1630215345950723,1630229420222468";

  public static final String JOB_GROUP = "toutiao";
  public static final String JOB_KEY_TOUTIAO = "toutiao";

  public static final String TOUTIAO_ACCESSTOKEN = "toutiao:accesstoken";
  public static final String TENCENT_ACCESSTOKEN = "tencent:accesstoken";
  public static final String TOUTIAO_ADVERTISERIDS = "toutiao:advertiserids";

  public static final String ADPLAN_STATUS = "status";
  public static final String ADPLAN_OPTSTATUS = "optstatus";
  public static final String ADPLAN_LEARNINGPHASE = "learningphase";


  public static String getTencentRedisKey(String account){
    return TENCENT_ACCESSTOKEN + ":" + account;
  }

}
