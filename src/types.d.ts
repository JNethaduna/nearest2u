type ObjectId = import('mongodb').ObjectId;

interface Item {
	_id: ObjectId;
	name: string;
	brand: string;
	price: number;
	thumbnail: string;
}

interface Store {
	_id: ObjectId;
	name: string;
	geometry: GeoJSON;
	items: [{ item: ObjectId; quantity: number }];
	owner: {
		nic: string;
		verified: boolean;
	};
}

interface GeoJSON {
	type: string;
	coordinates: [number, number];
}
