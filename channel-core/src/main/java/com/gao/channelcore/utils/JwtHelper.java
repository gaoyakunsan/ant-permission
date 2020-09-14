package com.gao.channelcore.utils;

import com.gao.channelcore.business.dao.UserMapper;
import com.gao.channelcore.business.service.UserService;
import com.gao.channelcore.pojo.Menu;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import java.security.Key;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;
import javax.crypto.spec.SecretKeySpec;
import javax.servlet.http.HttpServletRequest;
import javax.xml.bind.DatatypeConverter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

public class JwtHelper {

    /**
     * 解析jwt
     */

    public static Claims parseJWT(String jsonWebToken, String base64Security){
        try{
            Claims claims = Jwts.parser()
                    .setSigningKey(DatatypeConverter.parseBase64Binary(base64Security))
                    .parseClaimsJws(jsonWebToken).getBody();
            return claims;
        }catch (Exception e){
            return null;
        }
    }

    /**
     *
     * @param name
     * @param userId
     * @param audience
     * @param issuer
     * @param TTLMillis
     * @param base64Security
     * @return
     */
    public static String createJWT(String name, Integer userId,
                                   String audience, String issuer, long TTLMillis, String base64Security, UserMapper userMapper){
        SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;

        long nowMillis = System.currentTimeMillis();
        Date now = new Date(nowMillis);

        //生成签名密钥
        byte[] apiKeySecretBytes = DatatypeConverter.parseBase64Binary(base64Security);
        Key signingKey = new SecretKeySpec(apiKeySecretBytes, signatureAlgorithm.getJcaName());

        //存放此用户所有的菜单权限
        List<Menu> list = userMapper.getUserMenuButton(String.valueOf(userId));
        List<String> liststr =list.stream().map(Menu::getButtonId).collect(Collectors.toList());

        //添加构成JWT的参数
        JwtBuilder builder = Jwts.builder().setHeaderParam("typ", "JWT")
                .claim("unique_name", name)
                .claim("userid", userId)
                .claim("userButtonId", liststr)
                .setIssuer(issuer)
                .setAudience(audience)
                .signWith(signatureAlgorithm, signingKey);
        //添加Token过期时间
        if (TTLMillis >= 0) {
            long expMillis = nowMillis + TTLMillis;
            Date exp = new Date(expMillis);
            builder.setExpiration(exp).setNotBefore(now);
        }
        //生成JWT
        return builder.compact();
    }

    public static Claims getUserInfo(String base64Secret){
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
        final String authHeader = request.getHeader("authorization");
        String url = request.getRequestURL()+"";
        String[] urls = url.split("/");
        String root = urls[0]+"/"+urls[1]+"/"+urls[2];
        final String token = authHeader.substring(7);
         try {
            final Claims claims = JwtHelper.parseJWT(token, base64Secret);
            return claims;
        }catch (Exception e){
             e.printStackTrace();
             return null;
         }
    }
}
