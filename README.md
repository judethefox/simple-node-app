### The Task
#### Requirements:
* Design & Build an API for adding and searching properties for sale:
* Endpoint to add property with address, sale price, and description.
  * Endpoint to search properties using an optional suburb filter.
  Search results must include the property address, sale price **and some kind
  of field to indicate if the property is above, below or equal to the avg price
  for properties in the suburb**.

Currently, there is no requirement to use a database (i.e. in memory storage is fine).
However, if we had millions of properties, describe any further considerations (if any) that
would you make to the design.

#### Notes:
* Whilst you can implement the solution in any language, the preference is nodejs
(you can use express or equivalent as a local web server).
* Please ensure you structure your code and include an appropriate level of testing as
though you’re writing for production.
* Please note down any assumptions you make.

***
### To test the app
* To install dependencies: `yarn install`
* To run ExpressJS server: `yarn run server`
* To run ReactJS app: `yarn start`

### Assumptions / Clarification
* The search and suburb average price calculation is based on the assumption that suburb names are unique across the country.
* There cannot be more than one property at the same street address. (Used when detecting duplicate addresses)
* Data submitted from the client are always safe. No server side validation is added.
* When search for properties, the loading is always lighting fast, therefore no loading spinner is added.
* Unit tests do not cover all scenarios and all components - They are added for the purpose of demonstrating the idea only.

### What if we have millions of properties?
* Obviously we'll store the properties in databases, can also use some caching mechanism to help with the querying speed.
* Add Google address autocomplete to reduce error when adding properties, with optional manual address form in case the address does not exist yet.
* Add pagination to search results.
* Store the suburb average price data in the database, and run a scheduled tasks, potentially overnight, to update the data, so we can avoid re-calculating it everytime when user search for properties.

### Tasks planned - Frontend
* Add property components (Add button, modal, fields)
* Form input data validation and post data handling
* Add property server error handling
* Search property components (Search button, optional suburb input)
* Search property server error handling
* Property list rendering
* Frontend component and util methods unit test

### Tasks planned - Backend
* New property post data handling
* Check if property exists by comparing the address, suburb and state
* Search property handling
* Suburb property average price calculation
* Add price point to property data returned
* Error handling
* Add unit tests for the util methods