<script lang="ts">
	import { goto } from '$app/navigation';

	let query: string = '';
	let searchHistory: string[] = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];
	let items: string[] = [];

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
	// FIXME: This thing sends location in the URL, which is not secure
	async function locateItem(itemId: number) {
		const location = await getUserLocation();
		if (location) {
			goto(
				`/map?item=${encodeURIComponent(itemId)}&origin=${encodeURIComponent(JSON.stringify(location))}`
			);
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

<div class="flex flex-col">
	<h1 class="my-16 text-center text-3xl text-rose-700">Nearest2U</h1>
	<input
		class="mx-7 mt-5 rounded-sm p-2 text-xl shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-rose-600"
		type="text"
		bind:value={query}
		placeholder="Search for an item"
	/>
	<div class="mx-7 my-1 text-red-700">
		{#each items as item}
			<button
				on:click={() => {
					locateItem(1);
				}}
				class="w-full cursor-pointer border-b-2 bg-white p-2 text-left first-of-type:rounded-t-sm last-of-type:rounded-b-sm last-of-type:border-b-0 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
			>
				{item}
			</button>
		{/each}
	</div>
</div>
