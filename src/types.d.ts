type ObjectId = import('mongodb').ObjectId;

interface Item {
	_id: ObjectId | string;
	name: string;
	brand: string;
	price: number;
	thumbnail: string;
}

interface Store {
	_id: ObjectId | string;
	email: string;
	password?: string;
	name: string;
	geometry: GeoJSON;
	items?: { _id: ObjectId; quantity: number }[];
	owner?: {
		nic: string;
		verified: boolean;
	};
	status?: {
		openingTime?: Date;
		closingTime?: Date;
		manuallySet: boolean;
		setValue?: boolean;
	};
}

interface User {
	_id: ObjectId;
	email: string;
	password: string;
	searchHistory: ObjectId[];
	version: number;
}

interface GeoJSON {
	type: string;
	coordinates: [number, number];
}
