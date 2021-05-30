package com.gao.channelcore.business.service;

import com.alibaba.druid.pool.DruidDataSource;
import com.gao.channelcore.business.dao.MenuMapper;
import com.gao.channelcore.business.dao.RoleMapper;
import com.gao.channelcore.business.dao.RoleMenuMapper;
import com.gao.channelcore.model.MenuModel;
import com.gao.channelcore.pojo.Menu;

import java.sql.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

import com.gao.channelcore.pojo.RoleMenu;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;

import com.alibaba.druid.pool.DruidDataSourceFactory;

@Service
public class MenuService {

    @Autowired
    private MenuMapper menuMapper;
    @Autowired
    private RoleMenuMapper roleMenuMapper;


    private static final ConcurrentMap<String, DataSource> datasourceMap = new ConcurrentHashMap<>();


    public List<Menu> selectAllMenu() {
        return menuMapper.selectAllMenu();
    }

    public List<MenuModel> selectAllMenuByMenuModel() {
        return menuMapper.selectAllMenuByMenuModel();
    }

    public List<Map<String, Object>> selectAllMenuByMap() {
        return menuMapper.selectAllMenuByMap();
    }

    public String[] getAllMenuId() {
        List<Menu> list = menuMapper.selectAllMenu();
        if (list != null && list.size() > 0) {
            String[] strArr = new String[list.size()];
            for (int i = 0; i < list.size(); i++) {
                strArr[i] = String.valueOf(list.get(i).getId());
            }
            return strArr;
        } else {
            return new String[0];
        }
    }

    public List<Map<String, Object>> selectAllMenuByTree() {
        return menuMapper.selectAllMenuByTree();
    }

    public String[] getAllMenuByRoleId(Integer roleId) {
        Map map = new HashMap();
        map.put("roleId", roleId);
        List<RoleMenu> list = roleMenuMapper.selectRoleMenuByParams(map);
        if (list != null && list.size() > 0) {
            String[] strArr = new String[list.size()];
            for (int i = 0; i < list.size(); i++) {
                strArr[i] = String.valueOf(list.get(i).getMenuId());
            }
            return strArr;
        } else {
            return new String[0];
        }
    }

    public void updateByPrimaryKeySelective(Menu record) {
        menuMapper.updateByPrimaryKeySelective(record);
    }

    public Menu selectByPrimaryKey(Integer menuId) {
        return menuMapper.selectByPrimaryKey(menuId);
    }

    public List<Menu> selectByParams(Menu record) {
        return menuMapper.selectByParams(record);
    }

    public int insertSelective(Menu record) {
        menuMapper.insertSelective(record);
        return record.getId();
    }

    public void getConnection() {
        DruidDataSource datasource = new DruidDataSource();

        datasource.setUrl("jdbc:mysql://localhost:3306/tzn?allowMultiQueries=true&useUnicode=yes&characterEncoding=utf8&serverTimezone=GMT%2B8");
        datasource.setUsername("root");
        datasource.setPassword("1qaz!QAZ");
        datasource.setDriverClassName("com.mysql.jdbc.Driver");

        datasource.setInitialSize(5);
        datasource.setMinIdle(5);
        datasource.setMaxActive(20);
        datasource.setMaxWait(60000);
        datasource.setTimeBetweenEvictionRunsMillis(60000);
        datasource.setMinEvictableIdleTimeMillis(300000);
        datasource.setValidationQuery("SELECT 1 FROM DUAL");
        datasource.setTestWhileIdle(true);
        datasource.setTestOnBorrow(false);
        datasource.setTestOnReturn(false);
        datasource.setPoolPreparedStatements(true);
        datasource.setMaxPoolPreparedStatementPerConnectionSize(20);
        //datasource.setDefaultAutoCommit(this.defaultAutoCommit);
        //datasource.setFilters(this.filters);
        //datasource.setConnectionProperties(this.connectionProperties);
        try {
            Connection connection = datasource.getConnection();
            PreparedStatement statement = connection.prepareStatement("SELECT id as IDTest, idbigint, name, `desc`, doubletest, floattest, decimaltest, inserttime, datatimetest, insertby, updatetime, updateby, isactive FROM tzn.typetest");
            ResultSetMetaData resultSetMetaData = statement.getMetaData();
            for (int i = 1 ; i <= resultSetMetaData.getColumnCount(); i ++) {
                System.out.println(resultSetMetaData.getColumnName(i));
                System.out.println(resultSetMetaData.getCatalogName(i));
                System.out.println(resultSetMetaData.getColumnClassName(i));
                System.out.println(resultSetMetaData.getColumnTypeName(i));
            }
            resultSetMetaData.getColumnCount();
            ParameterMetaData parameterMetaData = statement.getParameterMetaData();
            parameterMetaData.getParameterCount();
        } catch (Exception e) {

        }

    }


    /*private Connection getConnection() throws Exception {
        String usePool = dataSource.get(POOLED);
        String username = dataSource.get(USERNAME);
        String password = dataSource.get(PASSWORD);
        Connection conn = null;
        if (usePool != null && "true".equals(usePool)) {
            String key = Hashing.md5().newHasher().putString(JSONObject.toJSON(dataSource).toString(), Charsets.UTF_8).hash().toString();
            DataSource ds = datasourceMap.get(key);
            if (ds == null) {
                synchronized (key.intern()) {
                    ds = datasourceMap.get(key);
                    if (ds == null) {
                        Map<String, String> conf = new HashedMap();
                        conf.put(DruidDataSourceFactory.PROP_DRIVERCLASSNAME, dataSource.get(DRIVER));
                        conf.put(DruidDataSourceFactory.PROP_URL, dataSource.get(JDBC_URL));
                        conf.put(DruidDataSourceFactory.PROP_USERNAME, dataSource.get(USERNAME));
                        if (StringUtils.isNotBlank(password)) {
                            conf.put(DruidDataSourceFactory.PROP_PASSWORD, dataSource.get(PASSWORD));
                        }
                        conf.put(DruidDataSourceFactory.PROP_INITIALSIZE, "3");
                        DruidDataSource druidDS = (DruidDataSource) DruidDataSourceFactory.createDataSource(conf);
                        druidDS.setBreakAfterAcquireFailure(true);
                        druidDS.setConnectionErrorRetryAttempts(5);
                        datasourceMap.put(key, druidDS);
                        ds = datasourceMap.get(key);
                    }
                }
            }
            try {
                conn = ds.getConnection();
            } catch (SQLException e) {
                datasourceMap.remove(key);
                throw e;
            }
            return conn;
        } else {
            String driver = dataSource.get(DRIVER);
            String jdbcurl = dataSource.get(JDBC_URL);

            Class.forName(driver);
            Properties props = new Properties();
            props.setProperty("user", username);
            if (StringUtils.isNotBlank(password)) {
                props.setProperty("password", password);
            }
            return DriverManager.getConnection(jdbcurl, props);
        }
    }*/

}
