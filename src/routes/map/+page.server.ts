import type { PageServerLoad } from './$types';
import { findStoresWithItemInRange } from '$lib/database/stores';
import { env } from '$env/dynamic/private';
import { getLocation } from '$lib/server/database/locations';

export const load: PageServerLoad = async ({ url, locals }) => {
	const URL = 'https://routes.googleapis.com/distanceMatrix/v2:computeRouteMatrix';

	const itemId = url.searchParams.get('item');
	const origin: location = getLocation(locals.session.id);

	const stores: Store[] = await findStoresWithItemInRange(Number(itemId), origin, 10000);

	const response = await fetch(
		URL,
		createGMapRequest(
			origin,
			stores.map((store) => store.location)
		)
	);
	const data = await response.json();
	return {
		stores: getTopStores(data, stores)
	};
};

function createGMapRequest(origin: location, destinations: location[]) {
	return {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'X-Goog-Api-Key': env.GOOGLE_MAPS_API_KEY,
			'X-Goog-FieldMask': 'destinationIndex,duration,distanceMeters,status,condition'
		},
		body: JSON.stringify({
			origins: {
				waypoint: {
					location: {
						latLng: {
							latitude: origin.coordinates[1],
							longitude: origin.coordinates[0]
						}
					}
				}
			},
			destinations: destinations.map((destination) => {
				return {
					waypoint: {
						location: {
							latLng: {
								latitude: destination.coordinates[1],
								longitude: destination.coordinates[0]
							}
						}
					}
				};
			})
		})
	};
}

function getTopStores(
	data: [
		{
			destinationIndex: number;
			duration: number;
			distanceMeters: number;
		}
	],
	stores: Store[]
) {
	return data
		.sort((a, b) => a.distanceMeters - b.distanceMeters)
		.slice(0, 5)
		.map((item) => stores[item.destinationIndex]);
}
