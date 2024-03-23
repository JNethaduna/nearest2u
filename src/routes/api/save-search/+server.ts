import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import { addToHistory } from '$lib/server/database/user';
import { ObjectId } from 'mongodb';

export const POST: RequestHandler = async ({ request, locals }) => {
	const { itemId }: { itemId: string } = await request.json();
	const userId = locals.user.user.id as string;
	if (!userId) {
		return json({ success: true });
	}
	await addToHistory(new ObjectId(userId), new ObjectId(itemId));
	return json({ success: true });
};
