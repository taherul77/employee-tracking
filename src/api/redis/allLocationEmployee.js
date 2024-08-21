import Redis from 'ioredis';
import { AllLocationEmployee } from '@/api';

const redis = new Redis({
  host: process?.env?.REDIS_PUBLIC_HOST,
  port: process?.env?.REDIS_PUBLIC_PORT,

});

export async function getAllLocationEmployee() {
  const cacheKey = 'allLocationEmployee';
  // Cache for 15 minutes
  const cacheTTL = 15 * 60;
  try {
    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
      return JSON.parse(cachedData);
    }

    const data = await AllLocationEmployee();
    await redis.set(cacheKey, JSON.stringify(data), 'EX', cacheTTL);

    return data;
  } catch (error) {
    console.error('Error in getAllLocationEmployee:', error);
    throw new Error('Internal Server Error');
  }
}
