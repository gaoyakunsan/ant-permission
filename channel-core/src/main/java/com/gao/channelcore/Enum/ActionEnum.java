package com.gao.channelcore.Enum;

public enum ActionEnum {

    yusuan("yusuan"),
    chujia("chujia"),
    inclue("inclue"),
    exclue("exclue"),
    plan("plan"),
    gaojing("gaojing"),
    scheduleTime("scheduleTime"),
    zhijiefuzhi("zhijiefuzhi"),
    budgetmode("budgetmode"),
    mappingcount("mappingcount"),
    sucaifuzhi("sucaifuzhi");

    private String value;

    private ActionEnum(String value){
        this.value = value;
    }

    public String getValue() {
        return value;
    }

}
