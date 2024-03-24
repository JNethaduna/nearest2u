<body class="flex h-svh w-full bg-white" style="display:block">
	<main>
		<form method="POST" class="mx-5 rounded-md p-2">
			<h2 class="pt-8 text-center text-3xl font-bold">Sign up</h2>
			<label class="label my-4">
				<span>Email</span>
				<input
					name="email"
					class="input form-input"
					type="email"
					placeholder="Enter your email"
					required
				/>
			</label>
			<label class="label my-4">
				<span>Password</span>
				<input
					name="password"
					class="input"
					type="password"
					placeholder="Enter your password"
					required
				/>
			</label>
			<button
				type="submit"
				class=" variant-outline-primary btn mt-4 w-full bg-primary-600 text-lg font-bold text-white shadow-md"
				>Sign Up</button
			>
		</form>
		<div class="mt-4 text-center">
			<a href="/user/signin" class="text-primary-600">Already have an account? Sign in</a>
		</div>
	</main>
</body>
