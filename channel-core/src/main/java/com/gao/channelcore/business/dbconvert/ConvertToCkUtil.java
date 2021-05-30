package com.gao.channelcore.business.dbconvert;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ConvertToCkUtil {

    private static final Logger logger = LoggerFactory.getLogger(ConvertToCkUtil.class);

    /**
     * mysql转ck
     * 当传decimal类型时要传decimal类型小数精确位
     *
     * @param mysqlColumType decimal:decimal类型小数精确位
     * @return
     */
    private static String getMysqlToCkCol(String mysqlColumType, String decimal) {
        String ckColumType = "";
        switch (mysqlColumType) {

            // int 类型
            case "TINYINT":
            case "TINYINT UNSIGNED":
                ckColumType = "Int8";
                break;
            case "SMALLINT":
            case "SMALLINT UNSIGNED":
                ckColumType = "Int16";
                break;
            case "MEDIUMINT":
            case "MEDIUMINT UNSIGNED":
            case "INT":
            case "INT UNSIGNED":
                ckColumType = "Int32";
                break;
            case "BIGINT":
            case "BIGINT UNSIGNED":
                ckColumType = "Int64";
                break;

            //浮点类型
            case "FLOAT":
                ckColumType = "Float32";
                break;
            case "DOUBLE":
                ckColumType = "Float64";
                break;

            //Decimal类型
            case "DECIMAL":
                ckColumType = "Decimal64(" + decimal + ")";
                break;

            //字符串类型
            case "VARCHAR":
                ckColumType = "String";
                break;

            //日期类型
            case "DATETIME":
            case "TIMESTAMP":
                ckColumType = "DateTime";
                break;
            case "DATE":
                ckColumType = "Date";
                break;

            default:
                logger.error("ConvertToCkUtil getMysqlToCkCol no recognize mysqlColumType:{}", mysqlColumType);
                ckColumType = "String";
                break;
        }

        return ckColumType;
    }
}
