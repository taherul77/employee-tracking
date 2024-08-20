import Redis from 'ioredis';
import { AllLocationEmployee } from '@/api';

const redis = new Redis({
  host: '127.0.0.1',
  port: 6379,
  password: '123456',
});

export async function getAllLocationEmployee() {
  const cacheKey = 'allLocationEmployee';
  // Cache for 15 minutes

  try {
    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
      return JSON.parse(cachedData);
    }

    const data = await AllLocationEmployee();
    await redis.set(cacheKey, JSON.stringify(data));

    return data;
  } catch (error) {
    console.error('Error in getAllLocationEmployee:', error);
    throw new Error('Internal Server Error');
  }
}
