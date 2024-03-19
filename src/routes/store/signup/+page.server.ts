import type { Actions } from './$types';
import { addStore } from '$lib/server/database/stores';

export const actions = {
	default: async ({ request }) => {
		console.log('Signup');
		const data = await request.formData();
		console.log(data);
		const email = data.get('email') as string;
		const password = data.get('password') as string;
		const name = data.get('name') as string;
		const location = {
			type: 'Point',
			coordinates: [
				parseFloat(data.get('longitude') as string),
				parseFloat(data.get('latitude') as string)
			]
		} as GeoJSON;
		const nic = data.get('nic') as string;

		try {
			await addStore(email, password, name, location, nic);
			return { status: 200, body: { message: 'Signup successful' } };
		} catch (e) {
			console.error(e);
			return {
				status: 500,
				body: {
					error: 'Internal server error'
				}
			};
		}
	}
} satisfies Actions;