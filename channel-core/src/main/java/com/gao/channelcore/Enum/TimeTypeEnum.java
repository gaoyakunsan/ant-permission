package com.gao.channelcore.Enum;

public enum TimeTypeEnum {

  T1("1"),
  T0("2"),
  RESET("3");

  private String value;

  private TimeTypeEnum(String value) {
    this.value = value;
  }

  public String getValue() {
    return value;
  }

}
