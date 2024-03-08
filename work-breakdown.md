# Work Breakdown and Information

## Main functionality

### Search Item Page ("/search")

- Contains a search box for item name input.
- Sends string input to API endpoint ("$lib/api/search?string").
- Displays auto-complete suggestions from API response (Refer to the endpoint for structure).
- Displays user's past searches (max five) as quick search options when nothing is entered to the search box.
- Allows selection of an item from suggestions or quick search options.
- Sends selected item's id and user's current coordinates as origin to endpoint (POST to "$lib/api/locate").

```js
// Response Structure
{
	// Body
	itemId: xxxxx,
	OriginX: xxx,
	OriginY: xxx,
}
```

### Item Search Endpoint ("/api/search-item?query=xxxx")

- Accepts a string from ("/search").
- Performs full-text search on JSON objects.
- Returns a list of max five items ordered by relevancy (Name is prioritized over description).

```js
// Response structure
{
	// Main body
	items: [
		// Total of five like so
		{
			id: xxxxxxx,
			name: xxxxxxxxxxxx
		},
		{
			id: xxxxxxx,
			name: xxxxxxxxxxxx
		}
	];
}
```

### Locate Item Endpoint ("/api/locate-item")

- Accepts an item id and a user's origin.
- Returns nearest coordinates to obtain the item relative to the origin (Check the displacement to the stores that have the item, take the closest 5).
- Uses Google Maps API to order locations by distance (Not displacement, path matters).
- Refer to Google Maps Routes API.

```js
// Response Structure
{
	// Main body
	originX: xxx,
	originY: xxx,
	destination: [
		// Total of five like so
		{
			x: xxx,
			y: xxx
		},
		{
			x: xxx,
			y: xxx
		},
	]
}
```

### Map Page ("/map")

- Accepts an origin and multiple destinations (Refer to "$lib/api/locate" for structure).
- Displays path to destinations on a map.
- Highlights the closest path.
- Refer to the Google Maps JS SDK.

## Store Functionality

### Store Registration Page ("/register/store")

- Sends form data to the endpoint (Use SvelteKit form actions send to +page.server.ts).
- Collects store name, email, password, location, and owner NIC.
- Uses JS form Validation.
- Displays error messages for invalid inputs.

### Register Store Endpoint

- Takes data from "/register/store".
- Validates the data again.
- Hashes the password using Argon2id (Read the documentation on how to use it).
- Adds data to the database (Function from "$lib/server/database/stores.ts").
- Response can be OK for success, or Error for invalid inputs.

### Store Login Page

- Sends form data to endpoint (Use SvelteKit form actions send to +page.server.ts).
- Collects store email and password.
- Uses JS form Validation.
- Displays error messages for invalid inputs.

### Store Login Endpoint

- Takes data from "/store/login"
- Validates the data again.
- Matches the hashed password against the one in the database (Function from "$lib/server/database/stores.ts").
- Response can be OK for success, or Error for invalid inputs.

### Manage Store Page (For store owner)

- Displays a verify identity button for stores that are not verified.
- Displays store name and owner ID and status (Open/Closed).
- Options to Add Items, Set Store Status, Update Store Details.
- Cannot add items or set status if unverified.
- Lists the products currently being sold by the shop with an option to update their stock.
- Refer to "$lib/server/database/stores.ts" for structure and data.

## More functionality details will be added as the project goes on
