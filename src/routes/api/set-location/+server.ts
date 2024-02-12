import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import { setLocation } from '$lib/server/database/locations';

export const POST: RequestHandler = async ({ request, locals }) => {
	const location = await request.json();
	const sessionId = locals.session.id;
	console.log(sessionId, location);
	setLocation(sessionId, location);

	return json({ status: 'ok' });
};
