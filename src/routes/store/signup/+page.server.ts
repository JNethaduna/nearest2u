import type { Actions } from './$types';
import { addStore } from '$lib/server/database/stores';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '$env/static/private';
import { redirect } from '@sveltejs/kit';

export const actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();
		const email = data.get('email') as string;
		const password = data.get('password') as string;
		const name = data.get('name') as string;
		const location = {
			type: 'Point',
			coordinates: [
				parseFloat(data.get('locationLng') as string),
				parseFloat(data.get('locationLat') as string)
			]
		} as GeoJSON;
		const nic = data.get('nic') as string;

		try {
			const storeid = await addStore(email, password, name, location, nic);
			const payload = {
				user: {
					type: 'store',
					id: storeid
				}
			};

			const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });

			cookies.set('auth', token, {
				httpOnly: true,
				secure: true,
				sameSite: 'strict',
				maxAge: 60 * 60 * 24,
				path: '/'
			});
		} catch (e) {
			console.error(e);
			return {
				status: 500,
				body: {
					error: 'Internal server error'
				}
			};
		}
		redirect(302, '/store/manage');
	}
} satisfies Actions;
