package com.gao.channelcore.Enum;

public enum InterfaceEnum {
  ADVERTISER(1),           //广告主数据
  CAMPAIGN(2),             //获取广告组数据
  ADPLAN(3),               //获取广告计划数据
  CREATIVE(4),             //获取广告创意数据
  PUTCAMPAIGN(5),          //广告投放-获取广告组
  PUTADPLAN(6),            //广告投放-获取广告计划
  PUTADCREATIVE(7),        //广告投放-获取创意列表
  PUTADCREATIVEDETIAL(8),  //广告投放-创意详细信息
  PUTADCREATIVEMATERIAL(9),//广告投放-创意素材信息
  AUDIENCEPROVINCE(10),    //受众分析数据--省级数据
  AUDIENCEGENDER(11),      //受众分析数据--性别数据
  AUDIENCETAG(12),          //受众分析数据--兴趣数据
  AUDIENCEAGE(13);          //受众分析数据--年龄数据


  private final Integer interfaceType;

  private InterfaceEnum(Integer interfaceType) {
    this.interfaceType = interfaceType;
  }

  public Integer getInterfaceType() {
    return interfaceType;
  }

}
