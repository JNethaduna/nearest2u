<script lang="ts">
	import type { PageData } from './$types';
	import StoreIcon from '$lib/images/store.svelte';

	export let data: PageData;
	let store = data.props?.store;

	let open = true;
	let close = () => {
		open = !open;
	};
</script>

<main class="flex h-svh flex-col">
	<h1 class="mx-5 my-2 text-center text-2xl text-secondary-500">Store Dashboard</h1>
	<section class="mx-5 my-2 rounded-md border-2 p-2">
		<div class="mb-3 flex items-center justify-between">
			<StoreIcon />
			<div>
				<h3 class="h2 text-primary-500">{store?.name}</h3>
				<p class="pl-1 text-sm text-surface-600">{store?.geometry?.coordinates[1]}</p>
				<p class="pl-1 text-sm text-surface-600">
					{store?.geometry?.coordinates[0]}
				</p>
			</div>
		</div>
		<hr />
		<div class="mt-3 flex justify-between px-2">
			<div class="flex items-center gap-1">
				<div class="h-4 w-4 rounded-full {open ? 'bg-green-500' : 'bg-red-500'}"></div>
				<p>{open ? 'Open' : 'Closed'}</p>
			</div>
			<button class="{open ? 'variant-soft-primary' : 'variant-soft-success'} btn" on:click={close}
				>{open ? 'Close Store' : 'Open Store'}</button
			>
		</div>
	</section>
	<section class="mx-5 my-2 rounded-md border-2">
		<button class="btn w-full">Manage Inventory</button>
	</section>
	<section class="mx-5 my-2 flex-grow rounded-md border-2 p-2">
		<h2 class="mb-3 text-center text-lg">Your Orders</h2>
		<hr />
		<div class="mt-3">
			<p class="text-center text-surface-700">No Orders Yet</p>
		</div>
	</section>
</main>
