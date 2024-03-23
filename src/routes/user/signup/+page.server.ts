import type { Actions } from './$types';
import { addUser } from '$lib/server/database/user';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '$env/static/private';
import { redirect } from '@sveltejs/kit';

export const actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();
		const email = data.get('email') as string;
		const password = data.get('password') as string;

		try {
			const user = await addUser(email, password);
			const payload = {
				user: {
					type: 'user',
					id: user._id
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
		redirect(302, '/search');
	}
} as Actions;
