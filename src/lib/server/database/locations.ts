const locations = new Map();

export function setLocation(sessionId: string, location: location) {
	locations.set(sessionId, location);
}

export function getLocation(sessionId: string) {
	return locations.get(sessionId);
}
