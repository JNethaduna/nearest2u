import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import { addToInventory } from '$lib/server/database/stores';
import { ObjectId } from 'mongodb';

export const POST: RequestHandler = async ({ request, locals }) => {
	const { itemId, quantity }: { itemId: string; quantity: number } = await request.json();
	const storeId = locals.user.user.id as string;
	const item = {
		item: new ObjectId(itemId),
		quantity: quantity
	};
	await addToInventory(new ObjectId(storeId), item);
	return json({ success: true });
};
