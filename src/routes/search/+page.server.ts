import type { PageServerLoad } from './$types';
import { getUserHistory } from '$lib/server/database/user';
import { getItem } from '$lib/server/database/items';
import { ObjectId } from 'mongodb';

export const load: PageServerLoad = async ({ locals }) => {
	const userId = locals.user.user.id as string;
	if (userId) {
		const history = await getUserHistory(new ObjectId(userId));
		if (history) {
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
		return;
	}
	return;
};
