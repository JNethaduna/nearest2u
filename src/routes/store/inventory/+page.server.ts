import type { PageServerLoad } from './$types';
import { ObjectId } from 'mongodb';
import { getInventory } from '$lib/server/database/stores';
import { getItem } from '$lib/server/database/items';

export const load: PageServerLoad = async ({ locals }) => {
	const storeId = new ObjectId(locals.user.user.id as string);
	const inventory = await getInventory(storeId);
	const inventoryWithItems = inventory.map(async (item) => {
		return {
			item: await getItem(item._id),
			quantity: item.quantity
		};
	});
	return {
		props: {
			inventory: await Promise.all(inventoryWithItems)
		}
	};
};
