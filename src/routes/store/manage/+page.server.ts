import type { PageServerLoad } from './$types';
import { ObjectId } from 'mongodb';
import { findStore } from '$lib/server/database/stores';

export const load: PageServerLoad = async ({ locals }) => {
	const storeId = new ObjectId(locals.user.user.id as string);
	const store = await findStore(storeId);
	return {
		props: {
			store: {
				_id: store?._id.toString(),
				name: store?.name,
				geometry: store?.geometry,
				items: store?.items
					? store.items.map((item) => {
							return {
								id: item._id.toString(),
								quantity: item.quantity
							};
						})
					: [],
				status: {
					openingTime: '08:00:00',
					closingTime: '20:00:00',
					manuallySet: false,
					setValue: false
				}
			}
		}
	};
};
