import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import { findStoresWithItemInRange } from '$lib/server/database/stores';
import { ObjectId } from 'mongodb';

export const POST: RequestHandler = async ({ request }) => {
	const { itemId, origin }: { itemId: string; origin: GeoJSON } = await request.json();
	const radius = 1000000;
	const stores = await findStoresWithItemInRange(new ObjectId(itemId), origin, radius);
	return json(stores);
};
