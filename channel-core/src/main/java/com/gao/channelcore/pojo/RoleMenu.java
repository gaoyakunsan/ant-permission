package com.gao.channelcore.pojo;

import java.util.Date;

public class RoleMenu {

  private Integer id;

  private Integer roleId;

  private Integer menuId;

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

  public Integer getRoleId() {
    return roleId;
  }

  public void setRoleId(Integer roleId) {
    this.roleId = roleId;
  }

  public Integer getMenuId() {
    return menuId;
  }

  public void setMenuId(Integer menuId) {
    this.menuId = menuId;
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
}