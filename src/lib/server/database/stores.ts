import type { Document, ObjectId, Collection } from 'mongodb';
import { connect, getCollection } from '$lib/server/service/mongodb';
import bcrypt from 'bcryptjs';

let stores: Collection | null = null;

async function init() {
	await connect();
	stores = getCollection('stores');
}

export async function findStore(storeId: ObjectId): Promise<Store | null> {
	if (!stores) await init();
	const store: Document | null = await stores!.findOne({ _id: storeId });
	return store ? (store as Store) : null;
}

export async function findStoresWithItemInRange(
	itemId: ObjectId,
	origin: GeoJSON,
	radius: number
): Promise<Store[]> {
	if (!stores) await init();
	if (!origin) {
		throw new Error('Origin is required');
	}
	const pipeline = [
		{
			$search: {
				index: 'store-locator',
				near: {
					path: 'geometry',
					origin: origin,
					pivot: radius
				}
			}
		},
		{
			$match: {
				items: {
					$elemMatch: {
						_id: itemId
					}
				}
			}
		},
		{
			$limit: 10
		},
		{
			$project: {
				_id: 1,
				name: 1,
				geometry: 1
			}
		}
	];
	const result = (await stores!.aggregate(pipeline).toArray()) as Store[];
	return result;
}

export async function addStore(
	email: string,
	password: string,
	name: string,
	geometry: GeoJSON,
	ownerNIC: string
): Promise<ObjectId> {
	if (!stores) await init();
	const store = {
		email,
		password: await bcrypt.hash(password, 10),
		name,
		geometry,
		items: [],
		owner: {
			nic: ownerNIC,
			verified: false
		}
	};
	try {
		const result = await stores!.insertOne(store);
		return result.insertedId;
	} catch (e) {
		console.error(e);
		throw e;
	}
}

export async function addItemToStore(
	storeId: ObjectId,
	item: { _id: ObjectId; quantity: number }
): Promise<void> {
	await stores!.updateOne({ _id: storeId }, {
		$push: {
			items: item
		}
	} as Document);
}

export async function changeItemCount(
	storeId: ObjectId,
	itemId: ObjectId,
	quantity: number
): Promise<void> {
	await stores!.updateOne({ _id: storeId, 'items._id': itemId }, {
		$inc: { 'items.$.quantity': quantity }
	} as Document);
}

export async function getInventory(storeId: ObjectId): Promise<
	{
		_id: ObjectId;
		quantity: number;
	}[]
> {
	if (!stores) await init();
	const inventory = (await stores!.findOne(
		{ _id: storeId },
		{ projection: { items: 1 } }
	)) as Document;
	return inventory.items as {
		_id: ObjectId;
		quantity: number;
	}[];
}

export async function addToInventory(
	storeId: ObjectId,
	item: {
		item: ObjectId;
		quantity: number;
	}
): Promise<void> {
	if (!item.quantity) {
		item.quantity = 1;
	}
	try {
		const store = (await stores!.findOne({
			_id: storeId,
			'items._id': item.item
		})) as Document as Store;
		if (store) {
			// If the item already exists in the store's item list, increment the count
			await changeItemCount(storeId, item.item, item.quantity);
		} else {
			// If the item doesn't exist in the store's item list, add it with a count of 1
			await addItemToStore(storeId, { _id: item.item, quantity: item.quantity });
		}
	} catch (e) {
		console.error(e);
	}
}

export async function verifyOwner(storeId: ObjectId): Promise<void> {
	await stores!.updateOne({ _id: storeId }, {
		$set: { 'owner.verified': true }
	} as Document);
}

export async function findStoreWithEmail(email: string): Promise<Store | null> {
	if (!stores) await init();
	const store: Document | null = await stores!.findOne({ email });
	return store ? (store as Store) : null;
}
