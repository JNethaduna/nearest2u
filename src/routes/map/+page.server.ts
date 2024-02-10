import type { PageServerLoad } from './$types';
import { findStoresWithItemInRange } from '$lib/database/stores';
import { env } from '$env/dynamic/private';

export const load: PageServerLoad = async ({ url }) => {
	const URL = 'https://routes.googleapis.com/distanceMatrix/v2:computeRouteMatrix';

	const itemId = url.searchParams.get('item');
	const origin: location = JSON.parse(url.searchParams.get('origin') || '{}') || {
		type: 'Point',
		coordinates: [80.0431051857624, 6.818610689705123]
	};

	const stores: Store[] = await findStoresWithItemInRange(Number(itemId), origin, 100000);

	const response = await fetch(
		URL,
		createGMapRequest(
			origin,
			stores.map((store) => store.location)
		)
	);
	const data = await response.json();
	return {
		props: {
			data
		}
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
