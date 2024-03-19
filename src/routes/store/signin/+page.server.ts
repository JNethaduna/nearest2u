import type { Actions } from './$types';
import { findStoreWithEmail } from '$lib/server/database/stores';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

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

			const token = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '1d' });

			cookies.set('auth', token, {
				httpOnly: true,
				secure: true,
				sameSite: 'strict',
				maxAge: 60 * 60 * 24,
				path: '/'
			});

			return {
				status: 200,
				body: {
					message: 'Authentication successful'
				}
			};
		} catch (e) {
			console.error(e);
		}
	}
} satisfies Actions;
