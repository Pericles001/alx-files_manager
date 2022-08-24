import { createHash } from 'crypto';
import { promises } from 'fs';

export default class UtilController {
  static SHA1(str) {
    return createHash('sha1').update(str).digest('hex');
  }

  static async readFile(path) {
    return promises.readFile(path, 'utf8');
  }
}
