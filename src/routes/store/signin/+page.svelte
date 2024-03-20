<script lang="ts">
</script>

<main>
	<form method="POST" class="mx-5 rounded-md p-2 shadow-md">
		<h1 class="mb-5 text-center">Sign in to manage your store</h1>
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
				placeholder="Enter your password"
				required
			/>
		</label>
		<button type="submit" class="variant-outline-primary btn w-full">Sign In</button>
	</form>
</main>
