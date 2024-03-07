import { json, type RequestHandler } from '@sveltejs/kit';
import { searchItems } from '$lib/server/database/items';

export const GET: RequestHandler = async (request) => {
	const searchString = request.url.searchParams.get('query');
	return json({ results: searchString ? await searchItems(searchString) : [] });
};
