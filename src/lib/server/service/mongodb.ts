import { MongoClient, type Db, type Collection } from 'mongodb';
import { MONGO_URI, MONGO_DB } from '$env/static/private';

let client: MongoClient;
let db: Db;

export async function connect() {
	client = new MongoClient(MONGO_URI);
	await client.connect();
	db = client.db(MONGO_DB);
	console.log(`Successfully connected to database: ${db.databaseName}`);
}

export function getCollection(name: string): Collection {
	return db.collection(name);
}

export async function close() {
	await client.close();
}
