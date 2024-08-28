import { AllEmployee, AllLocationEmployee, DesignationData } from '@/api';
import Redis from 'ioredis';

const redis = new Redis({
  host: process.env.REDIS_PUBLIC_HOST,
  port: process.env.REDIS_PUBLIC_PORT,
});

export async function getAllEmployee() {
  const cacheKey = 'allEmployee';
  const cacheTTL = 15 * 60; // Cache for 15 minutes

  try {
    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
      return JSON.parse(cachedData);
    }

    // Replace this with your actual data fetching logic
    const data = await AllEmployee();
    await redis.set(cacheKey, JSON.stringify(data), 'EX', cacheTTL);

    return data;
  } catch (error) {
    console.error('Error in getAllEmployee:', error);
    throw new Error('Internal Server Error');
  }
}

export async function getAllLocationEmployee() {
    const cacheKey = 'allLocationEmployee';
    const cacheTTL = 15 * 60; // Cache for 15 minutes
  
    try {
      const cachedData = await redis.get(cacheKey);
      if (cachedData) {
        return JSON.parse(cachedData);
      }
  
      // Replace this with your actual data fetching logic
      const data = await AllLocationEmployee();
      await redis.set(cacheKey, JSON.stringify(data), 'EX', cacheTTL);
  
      return data;
    } catch (error) {
      console.error('Error in AllLocationEmployee:', error);
      throw new Error('Internal Server Error');
    }
}

export async function getDesignations() {
    const cacheKey = 'designations';
    const cacheTTL = 15 * 60; // Cache for 15 minutes
  
    try {
      const cachedData = await redis.get(cacheKey);
      if (cachedData) {
        return JSON.parse(cachedData);
      }
  
      // Replace this with your actual data fetching logic
      const data = await DesignationData();
      await redis.set(cacheKey, JSON.stringify(data), 'EX', cacheTTL);
  
      return data;
    } catch (error) {
      console.error('Error in Designations:', error);
      throw new Error('Internal Server Error');
    }
}
