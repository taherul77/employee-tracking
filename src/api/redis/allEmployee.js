import Redis from 'ioredis';
import { AllEmployee } from '@/api';

const redis = new Redis({
  host: process?.env?.REDIS_PUBLIC_HOST,
  port: process?.env?.REDIS_PUBLIC_PORT, // Default Redis port
 
});

export async function getAllEmployee() {
  const cacheKey = 'allEmployee';
  const cacheTTL = 15 * 60;

  try {
    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
      return JSON.parse(cachedData);
    }

    const data = await AllEmployee();
    await redis.set(cacheKey, JSON.stringify(data), 'EX', cacheTTL);

    return data;
  } catch (error) {
    console.error('Error in getAllEmployee:', error);
    throw new Error('Internal Server Error');
  }
}
