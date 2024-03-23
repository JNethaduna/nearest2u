<script lang="ts">
	import { goto } from '$app/navigation';
	import type { ObjectId } from 'mongodb';
	import type { PageData } from './$types';

	export let data: PageData;

	let query: string = '';
	let searchHistory: Item[] = data.props?.history ?? [];
	let items: Item[] = [];

	// Auto-compelete items
	$: {
		query ? searchItems() : (items = searchHistory);
	}

	async function searchItems() {
		const response = await fetch(`/api/search-item?query=${encodeURIComponent(query)}`);
		if (response.ok) {
			const data = await response.json();
			items = data.results;
		}
	}

	// Locate an item
	async function locateItem(itemId: ObjectId | string) {
		await fetch(`/api/save-search`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ itemId })
		});
		const location = await getUserLocation();

		if (location) {
			sessionStorage.setItem('location', JSON.stringify(location));
			goto(`/map?itemId=${itemId}`);
		}
	}

	function getUserLocation() {
		return new Promise((resolve, reject) => {
			if (!navigator.geolocation) {
				reject('Geolocation is not supported by this browser. Please choose a custom location.');
			} else {
				navigator.geolocation.getCurrentPosition(
					(position) => {
						const location = {
							type: 'Point',
							coordinates: [position.coords.longitude, position.coords.latitude]
						};
						resolve(location);
					},
					(error) => {
						error.code === error.PERMISSION_DENIED
							? reject('User denied the request for Geolocation.')
							: reject('An unknown error occurred.');
					},
					{
						enableHighAccuracy: true,
						timeout: 5000,
						maximumAge: 5000
					}
				);
			}
		});
	}
</script>


<body class="min-h-screen bg-primary-500 text-white">

    <div class="flex justify-center py-4">
        <img src="/TransLogo.png" alt="Nearest2U" class="w-1280 h-64 object-contain" />
    </div>

    <div class="mx-4 md:mx-auto md:max-w-lg">
                <div class="flex flex-col justify-center rounded-md object-containborder border-black bg-white text-primary-500">
		<input
			class="rounded-t-md text-lg px-4 py-2 focus:outline-none focus:ring-primary-500  focus:border-transparent {query ? 'rounded-b-none' : 'rounded-b-md'}"
			type="text"
			bind:value={query}
			placeholder="Search for an item"
		/>
		{#each items as item}
			<button
				on:click={() => {
					locateItem(item._id);
				}}
				 class="btn flex justify-between items-center px-4 py-2 border-t border-primary-500 last-of-type:rounded-b-md hover:bg-primary-200"
			>
				{item.name} ({item.brand})
			</button>
		{/each}
	</div>
</body>
