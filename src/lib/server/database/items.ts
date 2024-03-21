import { connect, getCollection } from '$lib/server/service/mongodb';
import type { Collection, ObjectId } from 'mongodb';

let items: Collection | null = null;

async function init() {
	await connect();
	items = getCollection('items');
}

export async function searchItems(str: string): Promise<Item[]> {
	if (!items) await init();
	const pipeline = [
		{
			$search: {
				index: 'item-name',
				autocomplete: {
					query: str,
					path: 'name'
				}
			}
		}
	];
	const result = (await items!.aggregate(pipeline).toArray()) as Item[];
	return result;
}

export async function getItem(itemId: ObjectId): Promise<Item> {
	if (!items) await init();
	const item = (await items!.findOne({ _id: itemId })) as Item;
	item._id = item._id.toString();
	return item;
}
