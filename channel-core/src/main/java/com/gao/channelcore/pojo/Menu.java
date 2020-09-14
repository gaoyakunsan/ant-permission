package com.gao.channelcore.pojo;

import java.util.Date;

public class Menu {

  private Integer id;

  private Integer parentId;

  private String showText;

  private String buttonId;

  private String status;

  private String url;

  private Integer sort;

  private String icon;

  private String type;

  private String operateType;

  private Date inserttime;

  private String insertby;

  private Date updatetime;

  private String updateby;

  private Boolean isactive;

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public Integer getParentId() {
    return parentId;
  }

  public void setParentId(Integer parentId) {
    this.parentId = parentId;
  }

  public String getShowText() {
    return showText;
  }

  public void setShowText(String showText) {
    this.showText = showText == null ? null : showText.trim();
  }

  public String getStatus() {
    return status;
  }

  public void setStatus(String status) {
    this.status = status == null ? null : status.trim();
  }

  public String getUrl() {
    return url;
  }

  public void setUrl(String url) {
    this.url = url == null ? null : url.trim();
  }

  public Integer getSort() {
    return sort;
  }

  public void setSort(Integer sort) {
    this.sort = sort;
  }

  public String getIcon() {
    return icon;
  }

  public void setIcon(String icon) {
    this.icon = icon == null ? null : icon.trim();
  }

  public String getType() {
    return type;
  }

  public void setType(String type) {
    this.type = type == null ? null : type.trim();
  }

  public String getOperateType() {
    return operateType;
  }

  public void setOperateType(String operateType) {
    this.operateType = operateType == null ? null : operateType.trim();
  }

  public Date getInserttime() {
    return inserttime;
  }

  public void setInserttime(Date inserttime) {
    this.inserttime = inserttime;
  }

  public String getInsertby() {
    return insertby;
  }

  public void setInsertby(String insertby) {
    this.insertby = insertby == null ? null : insertby.trim();
  }

  public Date getUpdatetime() {
    return updatetime;
  }

  public void setUpdatetime(Date updatetime) {
    this.updatetime = updatetime;
  }

  public String getUpdateby() {
    return updateby;
  }

  public void setUpdateby(String updateby) {
    this.updateby = updateby == null ? null : updateby.trim();
  }

  public Boolean getIsactive() {
    return isactive;
  }

  public void setIsactive(Boolean isactive) {
    this.isactive = isactive;
  }

  public String getButtonId() {
    return buttonId;
  }

  public void setButtonId(String buttonId) {
    this.buttonId = buttonId;
  }
}