import type { Document, ObjectId, Collection } from 'mongodb';
import { connect, getCollection } from '$lib/server/service/mongodb';
import bcrypt from 'bcryptjs';

let users: Collection | null = null;

async function init() {
	await connect();
	users = getCollection('users');
}

export async function addUser(email: string, password: string): Promise<User> {
	if (!users) await init();
	const hashedPassword = await bcrypt.hash(password, 10);
	const result = await users!.insertOne({
		email,
		password: hashedPassword,
		searchHistory: [],
		version: 1
	});
	return result as Document as User;
}

export async function addToHistory(userId: ObjectId, itemId: ObjectId) {
	if (!users) await init();
	await users!.updateOne({ _id: userId }, { $push: { searchHistory: itemId } } as Document);
}

export async function getUserByEmail(email: string): Promise<User | null> {
	if (!users) await init();
	return users!.findOne({ email }) as Promise<User | null>;
}

export async function getUserHistory(userId: ObjectId): Promise<ObjectId[]> {
	if (!users) await init();
	const user = (await users!.findOne({ _id: userId })) as User;
	return user.searchHistory;
}
