package com.gao.channelcore.utils;

import com.alibaba.druid.pool.DruidDataSource;
import com.alibaba.druid.pool.DruidDataSourceFactory;
import com.alibaba.fastjson.JSONObject;
import com.google.common.hash.Hashing;

import java.sql.Connection;
import java.sql.DriverManager;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import javax.sql.DataSource;

import org.apache.commons.codec.Charsets;
import org.apache.commons.collections.map.HashedMap;
import org.apache.commons.lang3.StringUtils;

public class JdbcConUtil {

    private static final ConcurrentMap<String, DataSource> datasourceMap = new ConcurrentHashMap<String, DataSource>();

    /**
     * jdbc连接工具  支持多个连接jdbcurl(多个jdbcurl用“;;”隔开) 支持是否使用连接池连接 调用时 count传0, jdbcurlErrTmp传null
     *
     * @param username      用户名
     * @param password      密码
     * @param driver        连接驱动  mysql(com.mysql.jdbc.Driver)  sqlserver(com.microsoft.sqlserver.jdbc.SQLServerDriver)
     *                      oracle(oracle.jdbc.driver.OracleDriver)  impala,hive(org.apache.hive.jdbc.HiveDriver)
     * @param jdbcurl       数据库连接url(多个jdbcurl用“;;”隔开) 如：jdbc:mysql://hostname:port/db;;jdbc:mysql://hostname2:port/db
     * @param usePool       是否使用数据库连接池连接   true（使用连接池）  false（不使用连接池）
     * @param count         循环次数，调用时传0（暂不支持）
     * @param jdbcurlErrTmp 传入多个jdbcurl时，去除连接失败的jdbcurl，调用时传null（暂不支持）
     */
    public static Connection getConnection(String username, String password, String driver, String jdbcurl,
                                           boolean usePool, int count, String[] jdbcurlErrTmp) throws Exception {

        Connection conn = null;
        Pattern p = Pattern.compile("\\s*|\t|\r|\n");
        Matcher m = p.matcher(jdbcurl);
        String jdbcurl_dest = m.replaceAll("");

        String[] jdbcurl_arr = jdbcurl_dest.split(";;");
        String dataSource_jdbcurl = "";
        if (jdbcurl_arr.length == 1) {
            dataSource_jdbcurl = jdbcurl_arr[0];

        } else {
            Random random = new Random();
            int s = random.nextInt(jdbcurl_arr.length) % (jdbcurl_arr.length + 1);
            dataSource_jdbcurl = jdbcurl_arr[s];
        }
        if (usePool) {
            Map dataSource_copy = new HashMap();
            //dataSource_copy.putAll(dataSource);
            dataSource_copy.put("username", username);
            dataSource_copy.put("password", password);
            dataSource_copy.put("driver", driver);
            dataSource_copy.put("jdbcurl", dataSource_jdbcurl);
            String key = Hashing.md5().newHasher()
                    .putString(JSONObject.toJSON(dataSource_copy).toString(), Charsets.UTF_8).hash()
                    .toString();
            DataSource ds = datasourceMap.get(key);
            if (ds == null) {
                synchronized (key.intern()) {
                    ds = datasourceMap.get(key);
                    if (ds == null) {
                        Map<String, String> conf = new HashedMap();
                        conf.put(DruidDataSourceFactory.PROP_DRIVERCLASSNAME, driver);
                        conf.put(DruidDataSourceFactory.PROP_URL, dataSource_jdbcurl);
                        conf.put(DruidDataSourceFactory.PROP_USERNAME, username);

                        if (StringUtils.isNotBlank(password)) {
                            conf.put(DruidDataSourceFactory.PROP_PASSWORD, password);
                        }
                        conf.put(DruidDataSourceFactory.PROP_INITIALSIZE, "3");
                        if (jdbcurl_arr.length <= 1) {
                            conf.put(DruidDataSourceFactory.PROP_MAXACTIVE,
                                    "1500"); //解决java.lang.Exception: ERROR:wait millis 60000, active 3, maxActive 100
                        } else {
                            conf.put(DruidDataSourceFactory.PROP_MAXACTIVE, "150");
                        }
//						conf.put(DruidDataSourceFactory.PROP_MAXWAIT, "60000");//获取连接时最大等待时间，单位毫秒
                        conf.put(DruidDataSourceFactory.PROP_MAXWAIT, "120000");//获取连接时最大等待时间，单位毫秒 2min
                        conf.put(DruidDataSourceFactory.PROP_MINEVICTABLEIDLETIMEMILLIS, "300000");
                        conf.put(DruidDataSourceFactory.PROP_MINIDLE, "1");
                        conf.put(DruidDataSourceFactory.PROP_LOGABANDONED, "true");
                        conf.put("timeBetweenEvictionRunsMillis", "60000");
                        conf.put(DruidDataSourceFactory.PROP_POOLPREPAREDSTATEMENTS, "true");
                        conf.put(DruidDataSourceFactory.PROP_MAXOPENPREPAREDSTATEMENTS, "20");
                        conf.put("validationQuery", "select 1");
                        conf.put("testOnBorrow", "false");
//						 conf.put("testOnBorrow", "true");
                        conf.put("testOnReturn", "false");
                        conf.put(DruidDataSourceFactory.PROP_TESTWHILEIDLE, "true");
                        conf.put("removeAbandoned", "false");//超过时间限制是否回收
                        conf.put("removeAbandonedTimeout", "1800");
//						 conf.put(DruidDataSourceFactory.PROP_LOGABANDONED, "true");

                        DruidDataSource druidDS = (DruidDataSource) DruidDataSourceFactory
                                .createDataSource(conf);
                        druidDS.setBreakAfterAcquireFailure(
                                false);// true表示pool向数据库请求连接失败后标记整个pool为block并close，就算后端数据库恢复正常也不进行重连，客户端对pool的请求都拒绝掉.false表示不会标记
                        // pool为block，新的请求都会尝试去数据库请求connection。
                        datasourceMap.put(key, druidDS);
                        ds = datasourceMap.get(key);
                    }
                }
            }
            try {
                conn = ds.getConnection();
            } catch (Exception e) {
                datasourceMap.remove(key);
                if (conn != null) {
                    conn.close();
                }
                //重连去除上次连接错误的url  add by gyk
        /*if (jdbcurl_arr.length > 1) {
          if (errCount <= jdbcurl_arr_all.length) {
            if (jdbcurlErr == null) {
              jdbcurlErr = new String[jdbcurl_arr_all.length];
            }
            jdbcurlErr[errCount] = dataSource_jdbcurl;
            getConnection(username, password, driver, jdbcurl, usePool, errCount + 1, jdbcurlErr);
          }
        }*/
            }
            return conn;
        } else {
            Class.forName(driver);
            Properties props = new Properties();
            props.setProperty("user", username);
            if (StringUtils.isNotBlank(password)) {
                props.setProperty("password", password);
            }
            return DriverManager.getConnection(dataSource_jdbcurl, props);
        }
    }


    public static void main(String[] args) throws Exception {
    }
}
