import {createClient} from 'redis';
import {promisify} from 'util';

class RedisClient {
    constructor() {
        this.myClient = createClient();
        this.myClient.on('error', (error) => console.log(error));
    }

    isAlive(){
        return this.myClient.connected;
    }

}
