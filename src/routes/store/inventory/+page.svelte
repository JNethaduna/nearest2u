<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import type { PageData } from './$types';

	let query: string = '';
	let items: Item[] = [];

	let selectedItem: Item;
	let selectedQuantity: number = 1;

	export let data: PageData;
	$: inventory = data.props.inventory;

	$: {
		query ? searchItems() : (items = []);
	}

	async function searchItems() {
		const response = await fetch(`/api/search-item?query=${encodeURIComponent(query)}`);
		if (response.ok) {
			const data = await response.json();
			items = data.results;
		}
	}

	function selectItem(item: Item) {
		selectedItem = item;
	}

	async function addItem(itemId: string, quantity: number) {
		const response = await fetch(`/api/add-item`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ itemId, quantity })
		});
		if (response.ok) {
			invalidateAll();
		}
	}
</script>

<main>
	<div>
		<h1 class="text-center">Inventory</h1>
		<div>
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
							selectItem(item);
						}}
						class="btn justify-start rounded-none border-t last-of-type:rounded-b-md"
					>
						{item.name} ({item.brand})
					</button>
				{/each}
			</div>
			<h2>{selectedItem ? selectedItem.name : ''} ({selectedItem ? selectedItem.brand : ''})</h2>
			<input type="number" bind:value={selectedQuantity} />
			<button
				on:click={() => addItem(selectedItem._id.toString(), selectedQuantity)}
				class="variant-outline-primary btn mx-5"
			>
				Add Item
			</button>
		</div>
	</div>
	<div>
		<h2 class="text-center">Quick Change</h2>
		{#each inventory as item}
			<div class="my-1 flex items-center justify-around">
				<h3>{item.item.name} ({item.item.brand})</h3>

				<h3>{item.item.price['$numberDouble'] ?? item.item.price}</h3>
				<div class="flex items-center gap-2">
					<button
						on:click={() => addItem(item.item._id.toString(), -1)}
						class="variant-outline-primary btn btn-sm">-</button
					>
					<h3>{item.quantity}</h3>
					<button
						on:click={() => addItem(item.item._id.toString(), 1)}
						class="variant-outline-primary btn btn-sm">+</button
					>
				</div>
			</div>
		{/each}
	</div>
</main>
