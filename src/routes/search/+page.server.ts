import type { PageServerLoad } from './$types';
import { getUserHistory } from '$lib/server/database/user';
import { getItem } from '$lib/server/database/items';
import { ObjectId } from 'mongodb';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) {
		const userId = locals.user.user.id as string;
		const history = await getUserHistory(new ObjectId(userId));
		if (history.length > 0) {
			const Itemhistory = await Promise.all(
				history
					.toReversed()
					.slice(0, 5)
					.map((item) => getItem(item))
			);
			return {
				props: {
					history: Itemhistory
				}
			};
		}
		return {
			props: {
				history: []
			}
		};
	}
	return;
};
