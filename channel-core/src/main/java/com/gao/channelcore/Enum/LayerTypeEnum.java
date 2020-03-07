package com.gao.channelcore.Enum;

public enum  LayerTypeEnum {

  ADPLAN(1),           //广告
  ADGROUP(2),          //广告组
  ADVERTISER(3);       //广告主


  private final Integer layerType;

  private LayerTypeEnum(Integer layerType) {
    this.layerType = layerType;
  }

  public Integer getLayerType() {
    return layerType;
  }

}
