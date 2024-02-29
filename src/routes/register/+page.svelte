<script>
	let name = "";
	let email = "";
	let password = "";
	let confirmPassword = "";
	let storeName = "";
	let selectedLocation = "";
	let nic = "";
  
	const register = () => {
	  
	  console.log("Registration details:", { name, email, password, storeName, selectedLocation, nic });
	};
</script>

<main class="flex flex-col items-center justify-center max-w-md mx-auto p-8 bg-white text-black">
	<h1 class="text-2xl font-bold mb-4">Register Here</h1>
	<p class="text-gray-300 mb-4">Please fill in the details to create an account.</p>
	<form on:submit|preventDefault={register} class="space-y-4 w-full">
		<label for="name" class="block text-sm font-medium">Name</label>
		<input type="text" id="name" bind:value={name} placeholder="Name" class="border rounded-md p-2 w-full text-black" />

		<label for="email" class="block text-sm font-medium">Email:</label>
		<input type="email" id="email" bind:value={email} placeholder="E-mail" class="border rounded-md p-2 w-full text-black" />

		<label for="password" class="block text-sm font-medium">Password:</label>
		<input type="password" id="password" bind:value={password} placeholder="********" class="border rounded-md p-2 w-full text-black" />

		<label for="confirmPassword" class="block text-sm font-medium">Confirm Password:</label>
		<input type="password" id="confirmPassword" bind:value={confirmPassword} placeholder="********" class="border rounded-md p-2 w-full text-black" />

		<label for="storeName" class="block text-sm font-medium">Store Name:</label>
		<input type="text" id="storeName" bind:value={storeName} placeholder="Store name" class="border rounded-md p-2 w-full text-black" />

		<label for="location" class="block text-sm font-medium">Select Location:</label>
		<select id="location" bind:value={selectedLocation}  class="border rounded-md p-2 w-full text-black">
			<option value="" disabled></option>
			<option value="location1">Location 1</option>
			<option value="location2">Location 2</option>
			<option value="location3">Location 3</option>
			<option value="location2">Location 4</option>
		</select>

		<label for="nic" class="block text-sm font-medium">NIC (National Identity Card):</label>
		<input type="text" id="nic" bind:value={nic} placeholder="12345-6789012-3" class="border rounded-md p-2 w-full text-black" />

		<button type="submit" class="bg-red-500 text-black px-4 py-2 rounded-md w-full">Signup</button>
	</form>
</main>
