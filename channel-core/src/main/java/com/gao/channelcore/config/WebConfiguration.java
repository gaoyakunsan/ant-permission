package com.gao.channelcore.config;

import com.gao.channelcore.filter.JWTInterceptor;
import java.util.Arrays;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfiguration implements WebMvcConfigurer {

    @Bean
    JWTInterceptor jwtInterceptor(){
        return new JWTInterceptor();
    }
    //spring拦截器加载在springcontentText之前，所以这里用@Bean提前加载。否则会导致过滤器中的@AutoWired注入为空


    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(jwtInterceptor()).addPathPatterns(Arrays.asList("/user/**","/moniter/**","/strategy/**"))
                .excludePathPatterns(Arrays.asList("/", "/login"));
    }

}
