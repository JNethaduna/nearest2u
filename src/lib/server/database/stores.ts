import type { ObjectId } from 'mongodb';
import { connect, getCollection } from '$lib/server/service/mongodb';
import type { Collection } from 'mongodb';

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
				compound: {
					filter: {
						geoNear: {
							near: origin,
							distanceField: 'distance',
							maxDistance: radius * 1609.34,
							query: {
								'items.id': itemId
							}
						}
					}
				}
			}
		}
	];
	const result = (await stores!.aggregate(pipeline).toArray()) as Store[];
	return result;
}
