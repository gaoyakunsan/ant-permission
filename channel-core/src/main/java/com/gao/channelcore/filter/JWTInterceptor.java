package com.gao.channelcore.filter;

import com.gao.channelcore.utils.JwtHelper;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Component
public class JWTInterceptor implements HandlerInterceptor {



    @Value("${audience.base64Secret}")
    private String base64Secret;


    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception{
        final String authHeader = request.getHeader("authorization");
        String url = request.getRequestURL()+"";
        String[] urls = url.split("/");
        String root = urls[0]+"/"+urls[1]+"/"+urls[2];
        if ("OPTIONS".equals(request.getMethod())) {
            response.setStatus(HttpServletResponse.SC_OK);
            return true;
        } else {
            if (null == authHeader || !authHeader.startsWith("Bearer")) {
                response.sendRedirect(root);
                return  false;
            }
        }
        final String token = authHeader.substring(7);
        try {
            final Claims claims = JwtHelper.parseJWT(token, base64Secret);
            if (claims == null) {
                response.sendRedirect(root);
                return  false;
            }
            request.setAttribute("CLAIMS", claims);
            return true;
        } catch (final Exception e) {
            response.sendRedirect(root);
            return  false;
        }
    }

    @Override
    public void postHandle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, ModelAndView modelAndView)  {

    }

    @Override
    public void afterCompletion(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, Exception e)  {

    }

}
