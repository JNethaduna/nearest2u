import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import { findStoresWithItemInRange } from '$lib/server/database/stores';
import { geoJsonToLatLng } from '$lib/helpers';

export const POST: RequestHandler = async ({ request }) => {
	const { itemId, origin } = await request.json();
	const radius = 10;
	const stores = await findStoresWithItemInRange(itemId, origin, radius);
	return json(
		stores.map((store) => {
			return {
				name: store.name,
				location: geoJsonToLatLng(store.location)
			};
		})
	);
};
