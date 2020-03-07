package com.gao.channelcore.pojo;


public class School {

  private Integer id;

  private String schoolName;

  private Boolean isactive;

  private String inserttime;

  private String updatetime;

  private String insertby;

  private String updateby;

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public String getSchoolName() {
    return schoolName;
  }

  public void setSchoolName(String schoolName) {
    this.schoolName = schoolName;
  }

  public Boolean getIsactive() {
    return isactive;
  }

  public void setIsactive(Boolean isactive) {
    this.isactive = isactive;
  }

  public String getInserttime() {
    return inserttime;
  }

  public void setInserttime(String inserttime) {
    this.inserttime = inserttime;
  }

  public String getUpdatetime() {
    return updatetime;
  }

  public void setUpdatetime(String updatetime) {
    this.updatetime = updatetime;
  }

  public String getInsertby() {
    return insertby;
  }

  public void setInsertby(String insertby) {
    this.insertby = insertby;
  }

  public String getUpdateby() {
    return updateby;
  }

  public void setUpdateby(String updateby) {
    this.updateby = updateby;
  }
}