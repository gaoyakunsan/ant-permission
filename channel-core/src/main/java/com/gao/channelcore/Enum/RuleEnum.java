package com.gao.channelcore.Enum;

public enum RuleEnum {

    SYMBOL_GT(">"),
    SYMBOL_GTE(">="),
    SYMBOL_EQUAL("="),
    SYMBOL_LT("<"),
    SYMBOL_LTE("<="),
    SYMBOL_BETWEEN("between"),
    SYMBOL_IN("in"),
    SYMBOL_NOT_IN("not in"),
    SYMBOL_PLUS("+"),
    SYMBOL_MULTI("*"),
    SYMBOL_REDUCE("-"),
    SYMBOL_DIVI("/"),
    TYPE_SIMPLE("simple"),
    TYPE_COMPLEX("complex");

    private String value;

    private RuleEnum(String value){
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
