import type { Handle } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '$env/static/private';

export const handle: Handle = async ({ event, resolve }) => {
	const cookies = event.cookies;
	const token = cookies.get('auth');

	if (token) {
		try {
			const decoded = jwt.verify(token, JWT_SECRET);
			event.locals.user = decoded;
		} catch (e) {
			console.error('Invalid token');
		}
	}

	const response = await resolve(event);
	return response;
};
