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
	async function locateItem(itemId: ObjectId | string) {
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

<body class="min-h-svh">
	<h1 class="my-4 text-center text-2xl text-primary-500">nearest2u</h1>
	<div class="mx-7 mt-32 flex flex-grow flex-col justify-center rounded-md border border-black">
		<input
			class="rounded-t-md text-lg {query ? 'rounded-b-none' : 'rounded-b-md'}"
			type="text"
			bind:value={query}
			placeholder="Search for an item"
		/>
		{#each items as item}
			<button
				on:click={() => {
					locateItem(item._id);
				}}
				class="btn justify-start rounded-none border-t last-of-type:rounded-b-md"
			>
				{item.name} ({item.brand})
			</button>
		{/each}
	</div>
</body>
