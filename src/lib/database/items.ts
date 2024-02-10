const items: Item[] = [
	{
		id: 1,
		name: 'Item 1',
		brand: 'Brand 1',
		price: 100,
		thumbnail: 'https://via.placeholder.com/1'
	},
	{
		id: 2,
		name: 'Item 2',
		brand: 'Brand 1',
		price: 59,
		thumbnail: 'https://via.placeholder.com/2'
	},
	{
		id: 3,
		name: 'Item 3',
		brand: 'Brand 1',
		price: 32,
		thumbnail: 'https://via.placeholder.com/3'
	},
	{
		id: 4,
		name: 'Item 4',
		brand: 'Brand 1',
		price: 90,
		thumbnail: 'https://via.placeholder.com/4'
	},
	{
		id: 5,
		name: 'Item 5',
		brand: 'Brand 2',
		price: 150,
		thumbnail: 'https://via.placeholder.com/5'
	},
	{
		id: 6,
		name: 'Item 6',
		brand: 'Brand 2',
		price: 200,
		thumbnail: 'https://via.placeholder.com/6'
	},
	{
		id: 7,
		name: 'Item 7',
		brand: 'Brand 2',
		price: 300,
		thumbnail: 'https://via.placeholder.com/7'
	},
	{
		id: 8,
		name: 'Item 8',
		brand: 'Brand 2',
		price: 400,
		thumbnail: 'https://via.placeholder.com/8'
	},
	{
		id: 9,
		name: 'Item 9',
		brand: 'Brand 3',
		price: 500,
		thumbnail: 'https://via.placeholder.com/9'
	},
	{
		id: 10,
		name: 'Item 10',
		brand: 'Brand 3',
		price: 600,
		thumbnail: 'https://via.placeholder.com/10'
	},
	{
		id: 11,
		name: 'Item 11',
		brand: 'Brand 3',
		price: 700,
		thumbnail: 'https://via.placeholder.com/11'
	},
	{
		id: 12,
		name: 'Item 12',
		brand: 'Brand 3',
		price: 800,
		thumbnail: 'https://via.placeholder.com/12'
	},
	{
		id: 13,
		name: 'Item 13',
		brand: 'Brand 4',
		price: 900,
		thumbnail: 'https://via.placeholder.com/13'
	},
	{
		id: 14,
		name: 'Item 14',
		brand: 'Brand 4',
		price: 1000,
		thumbnail: 'https://via.placeholder.com/14'
	},
	{
		id: 15,
		name: 'Item 15',
		brand: 'Brand 4',
		price: 1100,
		thumbnail: 'https://via.placeholder.com/15'
	},
	{
		id: 16,
		name: 'Item 16',
		brand: 'Brand 4',
		price: 1200,
		thumbnail: 'https://via.placeholder.com/16'
	},
	{
		id: 17,
		name: 'Item 17',
		brand: 'Brand 5',
		price: 1300,
		thumbnail: 'https://via.placeholder.com/17'
	},
	{
		id: 18,
		name: 'Item 18',
		brand: 'Brand 5',
		price: 1400,
		thumbnail: 'https://via.placeholder.com/18'
	},
	{
		id: 19,
		name: 'Item 19',
		brand: 'Brand 5',
		price: 1500,
		thumbnail: 'https://via.placeholder.com/19'
	},
	{
		id: 20,
		name: 'Item 20',
		brand: 'Brand 5',
		price: 1600,
		thumbnail: 'https://via.placeholder.com/20'
	}
];

export function findItemsWith(searchString: string): Item[] {
	return items
		.filter((item) => item.name.toLowerCase().includes(searchString.toLowerCase()))
		.slice(0, 5);
}
