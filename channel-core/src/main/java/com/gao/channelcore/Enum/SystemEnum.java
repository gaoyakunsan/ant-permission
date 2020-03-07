package com.gao.channelcore.Enum;

public enum SystemEnum {
  TOUTIAO(1), //头条
  TENGXUNFRIEND(2), //腾讯朋友圈
  GOOGLE(3), // GOOGLE ads
  TENCENT(4), // 腾讯广点通
  COLUMN_DATE(1),  //时间字段类型
  COLUMN_STRING(2),  //字符串字段类型
  COLUMN_NUM(3), //数字类型
  TIME_T_1(1),  //T+1类型
  TIME_T_0(2),  //T+0类型
  TIME_T_2(3);  //重置策略类型

  private final Integer systemType;

  private SystemEnum(Integer systemType) {
    this.systemType = systemType;
  }

  public Integer getSystemType() {
    return systemType;
  }
}
