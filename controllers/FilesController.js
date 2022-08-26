import { contentType } from 'mime-types';
import dbClient from '../utils/db';
import UtilController from './UtilController';

export default class FilesController {
  static async postUpload(request, response) {
    const userId = request.user.id;
    const {
      name, type, parentId, isPublic, data,
    } = request.body;
    if (!name || !type || (!['folder', 'file', 'image'].includes(type)) || (!data && type !== 'folder')) {
      // eslint-disable-next-line no-nested-ternary
      response.status(400).send(`error: ${!name ? 'Missing name' : (!type || (!['folder', 'file', 'image'].includes(type)))
        ? 'Missing type' : 'Missing data'}`);
    } else {
      try {
        let flag = false;
        if (parentId) {
          const folder = await dbClient.filterFiles({ _id: parentId });
          if (!folder) {
            response.status(400).json({ error: 'Parent not found' }).end();
            flag = true;
          } else if (folder.type !== 'folder') {
            response.status(400).json({ error: 'Parent is not a folder' }).end();
            flag = true;
          }
        }
        if (!flag) {
          const insRes = await dbClient.newFile(userId, name, type, isPublic, parentId, data);
          const docs = insRes.ops[0];
          delete docs.localPath;
          docs.id = docs._id;
          delete docs._id;
          response.status(201).json(docs).end();
        }
      } catch (err) {
        response.status(400).json({ error: err.message }).end();
      }
    }
  }
}
