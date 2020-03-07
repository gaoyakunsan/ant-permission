package com.gao.channelweb;

import com.alibaba.druid.support.http.StatViewServlet;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.ServletRegistrationBean;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@EnableTransactionManagement
@SpringBootApplication(scanBasePackages = {"com.gao.channelweb.controller",
    "com.gao.channelcore.business","com.gao.channelcore.config"})
@MapperScan("com.gao.channelcore.business.dao")
@EnableScheduling
public class ChannelWebApplication extends SpringBootServletInitializer {

  public static void main(String[] args) {
    SpringApplication.run(ChannelWebApplication.class, args);
  }

  @Override
  protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
    return builder.sources(ChannelWebApplication.class);
  }

  //druid 监控配置
  @Bean
  public ServletRegistrationBean<StatViewServlet> druidStatViewServlet() {
    ServletRegistrationBean<StatViewServlet> registrationBean = new ServletRegistrationBean<StatViewServlet>(
        new StatViewServlet(), "/druid/*");
    //registrationBean.addInitParameter("allow", "127.0.0.1");// IP白名单 (没有配置或者为空，则允许所有访问)
    //registrationBean.addInitParameter("deny", "");// IP黑名单 (存在共同时，deny优先于allow)
    registrationBean.addInitParameter("loginUsername", "root");
    registrationBean.addInitParameter("loginPassword", "root");
    registrationBean.addInitParameter("resetEnable", "false");
    return registrationBean;
  }
}
