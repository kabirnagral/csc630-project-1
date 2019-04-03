# Instructions

This app is a simple REST API for creating users and linking them with addresses.

## Endpoints

### Addresses
* POST `/address/create`: Creates a new address in the `Addresses` table.
  * Body (params required in request):
      * `addressTitle` (String): title of the address (i.e. "Grandma's House")
      * `address` (String): address
      * `userID` (Int): ID of the user who created the address
* POST `/address/update`: Updates a row in the `Addresses` table.
  * Body (params required in request):
      * `addressTitle` (String): title of the address (i.e. "Grandma's House")
      * `address` (String): address
      * `userID` (Int): ID of the user who the address belongs to
      * `addressID` (Int): ID of the address to update
* POST `/address/delete`: Updates a row in the `Addresses` table.
  * Body (params required in request):
      * `addressID` (Int): ID of the address to delete

### Users       
* POST `/user/create`: Creates a row in the `Users` table.
  * Body (params required in request):
      * `displayName` (String): Name of the user (i.e. "John")
      * `userName` (String): Username for the account (i.e. "johndoe245")
      * `lat` (Float): Latitude of user's homebase
      * `long` (Float): Longitude of user's homebase
* POST `/user/update`: Updates a row in the `Users` table.
  * Body (params required in request):
      * `displayName` (String): Name of the user (i.e. "John")
      * `userName` (String): Username for the account (i.e. "johndoe245")
      * `lat` (Float): Latitude of user's homebase
      * `long` (Float): Longitude of user's homebase
      * `userID` (Int): ID of the user to update
* POST `/user/delete`: Deletes a row in the `Users` table.
  * Body (params required in request):
      * `userID` (Int): ID of the user to delete

### Reading Data
* GET `/<username>/poi`: Returns a JSON array of locations created by a user
* GET `/user/<username>`: Returns a JSON object of the user with username <username>.
* GET `/users`: Returns a JSON of all users
* GET `/addresses`: Returns a JSON of all addresses
