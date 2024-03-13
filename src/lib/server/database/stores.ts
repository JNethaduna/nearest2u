import type { Document, ObjectId, Collection } from 'mongodb';
import { connect, getCollection } from '$lib/server/service/mongodb';

let stores: Collection | null = null;

async function init() {
	await connect();
	stores = getCollection('stores');
}

export async function findStoresWithItemInRange(
	itemId: ObjectId,
	origin: GeoJSON,
	radius: number
): Promise<Store[]> {
	if (!stores) await init();
	const pipeline = [
		{
			$search: {
				index: 'store-locator',
				near: {
					path: 'geometry',
					origin,
					pivot: radius
				}
			}
		},
		{
			$match: {
				items: {
					$elemMatch: {
						item: itemId
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
	console.log('Result:');
	console.log(result);
	return result;
}

export async function addStore(name: string, geometry: GeoJSON, ownerNIC: string): Promise<void> {
	if (!stores) await init();
	const store = {
		name,
		geometry,
		items: [],
		owner: {
			nic: ownerNIC,
			verified: false
		}
	};
	try {
		await stores!.insertOne(store);
	} catch (e) {
		console.error(e);
	}
}

export async function addItemToStore(
	storeId: ObjectId,
	item: { item: ObjectId; quantity: number }
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
	await stores!.updateOne({ _id: storeId, 'items.item': itemId }, {
		$inc: { 'items.$.quantity': quantity }
	} as Document);
}
