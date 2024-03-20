import type { Actions } from './$types';
import { findStoreWithEmail } from '$lib/server/database/stores';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '$env/static/private';
import { redirect } from '@sveltejs/kit';

export const actions = {
	default: async ({ cookies, request }) => {
		const data = await request.formData();
		const email = data.get('email') as string;
		const password = data.get('password') as string;
		try {
			const store = await findStoreWithEmail(email);
			if (!store) {
				return {
					status: 401,
					body: {
						error: 'Invalid email or password'
					}
				};
			}

			const valid = await bcrypt.compare(password, store.password!);
			if (!valid) {
				return {
					status: 401,
					body: {
						error: 'Invalid email or password'
					}
				};
			}

			const payload = {
				user: {
					type: 'store',
					id: store._id
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
