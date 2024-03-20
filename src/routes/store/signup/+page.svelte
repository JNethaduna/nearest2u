<script lang="ts">
	let storeLocationLat = '1.000';
	let storeLocationLng = '1.000';
</script>

<body class="flex h-svh w-full flex-col items-center justify-center">
	<main>
		<h2 class="text-center text-lg">nearest2u</h2>
		<form method="POST" class="mx-5 rounded-md p-2 shadow-md">
			<h1 class="mb-5 text-center">Create your Store</h1>
			<label class="label my-2">
				<span>Email</span>
				<input
					name="email"
					class="input form-input"
					type="email"
					placeholder="Enter your email"
					required
				/>
			</label>
			<label class="label my-2">
				<span>Password</span>
				<input
					name="password"
					class="input"
					type="password"
					placeholder="Select a secure password"
					required
				/>
			</label>
			<label class="label my-2">
				<span>Store Name</span>
				<input
					name="name"
					class="input"
					type="text"
					placeholder="Choose a name for your store"
					required
				/>
			</label>
			<label class="label my-2">
				<span>Owner Identification</span>
				<input
					name="nic"
					class="input"
					type="text"
					placeholder="Enter your NIC or Passport Number"
					required
				/>
			</label>
			<label class="label my-2">
				<span>Store Location</span>
				<input
					name="locationLat"
					type="text"
					hidden
					aria-hidden
					bind:value={storeLocationLat}
					required
				/>
				<input
					name="locationLng"
					type="text"
					hidden
					aria-hidden
					bind:value={storeLocationLng}
					required
				/>
				<input
					type="button"
					class="variant-form-material btn w-full cursor-pointer"
					value="Click to set your store location"
				/>
			</label>
			<button type="submit" class="variant-outline-primary btn mt-10 w-full">
				Create your Store
			</button>
		</form>
	</main>
</body>
