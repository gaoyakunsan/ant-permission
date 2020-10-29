package com.gao.channelcore.business.service;

//reids同步锁
public class RedisService {

  private static final String LOCK_SUCCESS = "OK";
  private static final String SET_IF_NOT_EXIST = "NX";
  private static final String SET_WITH_EXPIRE_TIME = "EX";//超时间秒
  private static final Long RELEASE_SUCCESS = 1L;

  /*@Autowired
  private JedisCluster jedisCluster;

  public void setKeyValue(String key, String value) {
    if (jedisCluster.exists(key)) {
      jedisCluster.del(key);
    }
    jedisCluster.set(key, value);
  }

  *//**
   * 尝试获取分布式锁
   *
   * @param jedis      Redis客户端
   * @param lockKey    锁
   * @param requestId  请求标识
   * @param expireTime 超期时间
   * @return 是否获取成功
   *//*
  public boolean tryGetDistributedLock(String lockKey,
      String requestId, int expireTime) {

    String result = jedisCluster
        .set(lockKey, requestId, SET_IF_NOT_EXIST, SET_WITH_EXPIRE_TIME, expireTime);
    if (LOCK_SUCCESS.equals(result)) {
      return true;
    }
    return false;
  }

  *//**
   * 释放分布式锁
   *
   * @param jedis     Redis客户端
   * @param lockKey   锁
   * @param requestId 请求标识
   * @return 是否释放成功
   *//*
  public boolean releaseDistributedLock(String lockKey,
      String requestId) {
    String script = "if redis.call('get', KEYS[1]) == ARGV[1] then return redis.call('del', KEYS[1]) else return 0 end";
    Object result = jedisCluster
        .eval(script, Collections.singletonList(lockKey), Collections.singletonList(requestId));
    if (RELEASE_SUCCESS.equals(result)) {
      return true;
    }
    return false;
  }*/

  /*public  boolean setParams(JedisCluster jedisCluster) {
    jedisCluster.set("test1111", "222222");
    return false;
  }*/

}
