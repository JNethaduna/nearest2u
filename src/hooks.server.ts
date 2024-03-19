import type { Handle } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';

export const handle: Handle = async ({ event, resolve }) => {
	const cookies = event.cookies;
	const token = cookies.get('auth');

	if (token) {
		try {
			const decoded = jwt.verify(token, process.env.JWT_SECRET!);
			event.locals.user = decoded;
		} catch (e) {
			console.error('Invalid token');
		}
	}

	const response = await resolve(event);
	return response;
};
