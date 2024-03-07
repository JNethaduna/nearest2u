// import type { Handle } from '@sveltejs/kit';

// export const handle: Handle = async ({ event, resolve }) => {
// 	// Set a session cookie to identify the user
// 	const cookies = event.cookies;
// 	let sessionId = cookies.get('sessionId');
// 	if (!sessionId) {
// 		sessionId = crypto.randomUUID();
// 	}
// 	event.locals.session = { id: sessionId };

// 	const response = await resolve(event);
// 	response.headers.set(
// 		'set-cookie',
// 		`sessionId=${sessionId}; Path=/; HttpOnly; SameSite=Lax; Secure;`
// 	);

// 	return response;
// };
