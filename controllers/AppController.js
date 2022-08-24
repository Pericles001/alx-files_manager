import redisClient from '../utils/redis';
import dbClient from '../utils/db';

class AppController {
  static getStatus(request, response) {
    const redisStatus = redisClient.isAlive();
    const dbStatus = dbClient.isAlive();
    response.set('Content-Type', 'application/json');
    response.status(200);
    response.json({ redis: redisStatus, db: dbStatus }).end();
  }

  static async getStats(request, response) {
    const usersCount = await dbClient.nbUsers();
    const filesCount = await dbClient.nbFiles();
    response.set('Content-Type', 'application/json');
    response.status(200);
    response.json({ users: usersCount, files: filesCount }).end();
  }
}

export default AppController;
