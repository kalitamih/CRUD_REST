import { promisifyAll } from "bluebird";
import redis, { RedisClient } from "redis";
import { logger } from "../../utils/logger";

interface RedisClientAsync extends RedisClient {
  setAsync(
    key: string,
    value: string,
    arg3?: string,
    arg4?: number
  ): Promise<void>;
  getAsync(key: string): Promise<string>;
  delAsync(key: string): Promise<number>;
}

export const redisClient = redis.createClient() as RedisClientAsync;

promisifyAll(redisClient);

redisClient.on("connect", () => {
  logger.info("Redis client connected succesfully");
});

redisClient.on("error", err => {
  logger.error(err);
});
