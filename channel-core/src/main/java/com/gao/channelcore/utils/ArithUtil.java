package com.gao.channelcore.utils;

import java.math.BigDecimal;

public class ArithUtil {

    //构造器私有化，让这个类不能实例化
    private ArithUtil(){}
    //提供精确的加法运算
    public static double add(String v1, String v2)
    {
        BigDecimal b1 = new BigDecimal(v1);
        BigDecimal b2 = new BigDecimal(v2);
        return (b1.add(b2)).setScale(2,BigDecimal.ROUND_HALF_UP).doubleValue();
    }
    //精确的减法运算
    public static double sub(String v1, String v2)
    {
        BigDecimal b1 = new BigDecimal(v1);
        BigDecimal b2 = new BigDecimal(v2);
        return (b1.subtract(b2)).setScale(2,BigDecimal.ROUND_HALF_UP).doubleValue();
    }
    //精确的乘法运算
    public static double mul(String v1, String v2)
    {
        BigDecimal b1 = new BigDecimal(v1);
        BigDecimal b2 = new BigDecimal(v2);
        return (b1.multiply(b2)).setScale(2,BigDecimal.ROUND_HALF_UP).doubleValue();
    }
    //提供（相对）精确的除法运算，当发生除不尽的情况时
    //精确到小数点后10位的数字四舍五入
    public static double div(String v1, String v2)
    {
        BigDecimal b1 = new BigDecimal(v1);
        BigDecimal b2 = new BigDecimal(v2);
        return (b1.divide(b2, 2, BigDecimal.ROUND_HALF_UP)).doubleValue();
    }

    public static  void  main(String[] args){
        System.out.println(mul("1533.96","1.11"));
    }


}
