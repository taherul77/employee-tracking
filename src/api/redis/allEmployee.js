import Redis from 'ioredis';
import { AllEmployee } from '@/api';

const redis = new Redis({
  host: '127.0.0.1', // Replace with your Redis server's IP if necessary
  port: 6379, // Default Redis port
  password: '123456', // Replace with your Redis password
});

export async function getAllEmployee() {
  const cacheKey = 'allEmployee';
 

  try {
    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
      return JSON.parse(cachedData);
    }

    const data = await AllEmployee();
    await redis.set(cacheKey, JSON.stringify(data));

    return data;
  } catch (error) {
    console.error('Error in getAllEmployee:', error);
    throw new Error('Internal Server Error');
  }
}
