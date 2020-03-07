package com.gao.channelcore.model;

import lombok.Data;

@Data
public class MenuModel {

  private String value;

  private String defaultValue;

  private Integer key;

  private Integer parentKey;

  private boolean isEditable = false;


}
