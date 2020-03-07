package com.gao.channelcore.model;

import lombok.Data;

@Data
public class TouTiaoRes {

  private String message;
  private Integer code;
  private Object data;
  private String request_id;

}
