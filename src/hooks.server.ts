import type { Handle, Reroute } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '$env/static/private';

let user: boolean = false;

export const reroute: Reroute = ({ url }) => {
	if ((url.pathname === '/store/manage' || url.pathname === '/store/inventory') && !user) {
		return '/store/signin';
	}
	return url.pathname;
};

export const handle: Handle = async ({ event, resolve }) => {
	const cookies = event.cookies;
	const token = cookies.get('auth');

	if (token) {
		try {
			const decoded = jwt.verify(token, JWT_SECRET);
			decoded ? (user = true) : (user = false);
			event.locals.user = decoded;
		} catch (e) {
			console.error('Invalid token');
		}
	}

	const response = await resolve(event);
	return response;
};
