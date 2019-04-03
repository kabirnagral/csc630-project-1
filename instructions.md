# Instructions

## Endpoints

* POST `/address/create`: Creates a new address in the `Addresses` table.
  * Body (params required in request):
      * `addressTitle` (String): title of the address (i.e. "Grandma's House")
      * `address` (String): address
      * `userID` (Int): ID of the user who created the address

* GET `/<username>/poi`: Returns a JSON array of locations created by a user 
