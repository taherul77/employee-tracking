import Redis from 'ioredis';
import { updateAllLocationEmployeeInDb, AllLocationEmployee } from '@/api';

const redis = new Redis({
  host: process?.env?.REDIS_PUBLIC_HOST,
  port: process?.env?.REDIS_PUBLIC_PORT,
});

const cacheKey = 'allLocationEmployee';
const cacheTTL = 15 * 60; // 15 minutes

// Update location employee data and invalidate cache
export async function updateAllLocationEmployee(newData) {
  try {
    // Update the data in the database or API
    await updateAllLocationEmployeeInDb(newData);

    // Invalidate the cache by deleting it
    await redis.del(cacheKey);

    // Publish the cache invalidation event to Redis Pub/Sub
    await redis.publish('dataChangeChannel', cacheKey);

    // Optionally, set new cache immediately
    const freshData = await AllLocationEmployee();
    await redis.set(cacheKey, JSON.stringify(freshData), 'EX', cacheTTL);

    return freshData;
  } catch (error) {
    console.error('Error in updateAllLocationEmployee:', error);
    throw new Error('Internal Server Error');
  }
}
