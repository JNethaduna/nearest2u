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

<main class="">
	<body class="min-h-screen">
		<div>
			<h1 class="pt-6 text-center text-3xl font-bold text-secondary-700">Inventory</h1>
			<div class=" px-2 py-6">
				<div class="rounded-md border border-gray-500 bg-white">
					<div
						class="mx-7 my-4 mt-4 flex flex-grow flex-col justify-center rounded-md border border-black"
					>
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
								class="btn rounded-none border-t last-of-type:rounded-b-md"
							>
								{item.name} ({item.brand})
							</button>
						{/each}
					</div>
					<div class="my-2">
						<h2 class="mx-7">
							{selectedItem ? selectedItem.name : '\u00A0'}
							{selectedItem ? selectedItem.brand : '\u00A0'}
						</h2>
						<input type="number" class="ml-7 mt-2 w-16" bind:value={selectedQuantity} />
						<button
							on:click={() => addItem(selectedItem._id.toString(), selectedQuantity)}
							disabled={!selectedItem}
							class="variant-outline-primary btn ml-2 bg-primary-200 pb-2 text-secondary-500"
						>
							Add Item
						</button>
					</div>
				</div>
			</div>
		</div>
		<div>
			<h2 class="m-4 text-center text-2xl font-semibold text-secondary-500">Quick Change</h2>
			<div class="px-2">
				<div class="rounded-md border border-gray-500 bg-white">
					{#each inventory as item}
						<div class="my-1 flex items-center justify-between px-2">
							<div>
								<h3 class="flex items-center font-medium">{item.item.name} ({item.item.brand})</h3>
								<p class="text-secondary-500">
									Price: {item.item.price['$numberDouble'] ?? item.item.price}
								</p>
							</div>
							<div class="flex items-center gap-2">
								<button
									on:click={() => addItem(item.item._id.toString(), -1)}
									class="variant-outline-primary btn btn-sm bg-primary-200">-</button
								>
								<h3 class="w-10 text-center">{item.quantity}</h3>
								<button
									on:click={() => addItem(item.item._id.toString(), 1)}
									class="variant-outline-primary btn btn-sm bg-primary-200">+</button
								>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</body>
</main>
