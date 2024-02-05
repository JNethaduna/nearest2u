interface Item {
	id: number;
	name: string;
	brand: string;
	price: number;
	thumbnail: string;
}

interface Store {
	id: number;
	name: string;
	location: location;
	items: number[];
	owner: {
		nic: string;
		verified: boolean;
	};
}

interface location {
	type: string;
	coordinates: [number, number];
}
