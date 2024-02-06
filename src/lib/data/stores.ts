const stores: Store[] = [
	{
		id: 1,
		name: 'Store 1',
		location: {
			type: 'Point',
			coordinates: [80.04176408129187, 6.823361882144782]
		},
		items: [1, 2, 3, 4, 20, 18],
		owner: {
			nic: '123456789V',
			verified: true
		}
	},
	{
		id: 2,
		name: 'Store 2',
		location: {
			type: 'Point',
			coordinates: [80.0406053670629, 6.825290043183253]
		},
		items: [1, 2, 7, 4, 13],
		owner: {
			nic: '987654321V',
			verified: true
		}
	},
	{
		id: 3,
		name: 'Store 3',
		location: {
			type: 'Point',
			coordinates: [80.0431051857624, 6.818610689705123]
		},
		items: [4, 5, 10, 13, 17],
		owner: {
			nic: '123456789V',
			verified: true
		}
	},
	{
		id: 4,
		name: 'Store 4',
		location: {
			type: 'Point',
			coordinates: [80.04330903363719, 6.815542630076611]
		},
		items: [3, 14, 16, 19, 20],
		owner: {
			nic: '987654321V',
			verified: true
		}
	},
	{
		id: 5,
		name: 'Store 5',
		location: {
			type: 'Point',
			coordinates: [80.041099327547, 6.822929622875006]
		},
		items: [9, 11, 12, 15, 16],
		owner: {
			nic: '123456789V',
			verified: true
		}
	},
	{
		id: 6,
		name: 'Store 6',
		location: {
			type: 'Point',
			coordinates: [80.03855441675455, 6.825516615054354]
		},
		items: [1, 5, 8, 13, 12],
		owner: {
			nic: '987654321V',
			verified: true
		}
	},
	{
		id: 7,
		name: 'Store 7',
		location: {
			type: 'Point',
			coordinates: [80.03586136689769, 6.825452651029698]
		},
		items: [5, 6, 7, 10, 15, 17],
		owner: {
			nic: '200223401192',
			verified: true
		}
	},
	{
		id: 8,
		name: 'Store 8',
		location: {
			type: 'Point',
			coordinates: [80.03539300991628, 6.825319783099442]
		},
		items: [2, 3, 4, 5, 6, 7, 8, 9, 10],
		owner: {
			nic: '200223401192',
			verified: true
		}
	},
	{
		id: 9,
		name: 'Store 9',
		location: {
			type: 'Point',
			coordinates: [80.04148643007512, 6.825599754750751]
		},
		items: [11, 13, 14, 15, 17, 20],
		owner: {
			nic: '200223401192',
			verified: true
		}
	},
	{
		id: 10,
		name: 'Store 10',
		location: {
			type: 'Point',
			coordinates: [80.04054729144617, 6.82118274432534]
		},
		items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
		owner: {
			nic: '200223401192',
			verified: true
		}
	}
];

/**
 * Find stores with the given item in the given radius in km
 * @param itemId - ID of the item
 * @param origin - Location of the user in GeoJSON {type: 'Point', coordinates: [long, lat]}
 * @param radius - Radius in km
 * @returns
 */
export function findStoresWithItemInRange(
	itemId: number,
	origin: location,
	radius: number
): Store[] {
	return findStoresInRadius(origin, radius).filter((store) => store.items.includes(itemId));
}

function findStoresInRadius(origin: location, radius: number): Store[] {
	return stores.filter((store) => {
		return haversineDistance(origin, store.location) <= radius;
	});
}

// Temp functions till MongoDB is implemented
function haversineDistance(origin: location, point: location): number {
	const R = 6371; // Radius of the earth in km
	const dLat = deg2rad(point.coordinates[1] - origin.coordinates[1]);
	const dLon = deg2rad(point.coordinates[0] - origin.coordinates[0]);
	const a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(deg2rad(origin.coordinates[1])) *
			Math.cos(deg2rad(point.coordinates[1])) *
			Math.sin(dLon / 2) *
			Math.sin(dLon / 2);
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	return R * c; // Distance in km
}

function deg2rad(deg: number): number {
	return deg * (Math.PI / 180);
}
