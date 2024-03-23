<body class="flex h-svh w-full bg-white" style="display:block">
	<main>
		
		<form method="POST" class="mx-5 rounded-md p-2">
			<h2 class="text-center text-3xl font-bold pt-8">Sign up</h2>	
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
		<button type="submit" class=" shadow-md variant-outline-primary btn w-full bg-primary-600 text-white font-bold text-lg mt-4">Sign Up</button>
	</form>
</main>
</body>