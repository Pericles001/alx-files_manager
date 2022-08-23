/*
Inside the folder utils, create a file db.js that contains the class DBClient.

DBClient should have:

    the constructor that creates a client to MongoDB:
    host: from the environment variable DB_HOST or default: localhost
port: from the environment variable DB_PORT or default: 27017
database: from the environment variable DB_DATABASE or default: files_manager
a function isAlive that returns true when the connection to MongoDB is a success otherwise, false
an asynchronous function nbUsers that returns the number of documents in the collection users
an asynchronous function nbFiles that returns the number of documents in the collection files */

import { env } from 'process';
import { MongoClient } from 'mongodb';
import { promises } from 'fs';

const { open, mkdir } = promises;

// eslint-disable-next-line import/prefer-default-export
export class DBClient {
  constructor() {
    const host = env.DB_PORT ? env.DB_PORT : '127.0.0.1';
    const port = env.DB_HOST ? env.DB_HOST : 27017;
    const database = env.DB_DATABASE ? env.DB_DATABASE : 'files_manager';
    this.myClient = MongoClient(`mongodb://${host}:${port}/${database}`);
    this.myClient.connect();
  }

  isAlive() {
    return this.myClient.isConnected();
  }

  async nbUsers() {
    /* returns number of documents in the collection users */
    const myDB = this.myClient.db();
    const myCollection = myDB.collection('users');
    return myCollection.countDocuments();
  }

  async nbFiles() {
    /* returns number of documents in the collection files */
    const myDB = this.myClient.db();
    const myCollection = myDB.collection('files');
    return myCollection.countDocuments();
  }
}

const dbClient = new DBClient();

export default dbClient;
