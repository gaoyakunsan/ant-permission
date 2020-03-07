package com.gao.channelcore.Enum;

public enum CreateAdLogEnum {

  //channel_create_ad_log 表 flag
  SUCCESS(1),
  ERROR(2),

  //channel_create_ad_log 表 create_type
  ADGROUP(1),          //广告组
  ADPLAN(2),           //广告计划
  CREATIVE(3),       //广告创意

  //channel_create_ad_log 表 type
  CUSTOMEXECUTE(1),   //手动执行
  STRATEGYEXECUTE(2), //策略执行
  SEEDEXECUTE(3)     //种子计划任务执行

  ;
  private final Integer type;

  private CreateAdLogEnum(Integer type) {
    this.type = type;
  }

  public Integer getType() {
    return type;
  }

}
