# Instructions

## Endpoints

* POST `/address/create`: Creates a new address in the `Addresses` table.
  * Body (params required in request):
      * `addressTitle` (String): title of the address (i.e. "Grandma's House")
      * `userID` (Int): ID of the user who created the address 
