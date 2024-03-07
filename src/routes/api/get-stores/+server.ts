import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import { findStoresWithItemInRange } from '$lib/server/database/stores';

export const POST: RequestHandler = async ({ request }) => {
	const { itemId, origin } = await request.json();
	const radius = 10;
	const stores = await findStoresWithItemInRange(itemId, origin, radius);
	return json(stores);
};
