<script lang="ts">
	import { goto } from '$app/navigation';
	import type { ObjectId } from 'mongodb';

	let query: string = '';
	let searchHistory: Item[] = [];
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
	async function locateItem(itemId: ObjectId) {
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
					locateItem(item._id);
				}}
				class="variant-filled-primary btn w-full cursor-pointer border-b-2 text-left first-of-type:rounded-t-sm last-of-type:rounded-b-sm last-of-type:border-b-0"
			>
				{item.name}
			</button>
		{/each}
	</div>
</div>
