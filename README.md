# Earth daily analytics demo

### How to start the app: run the following commands in your terminal
* git clone git@github.com:sajiro/eda.git
* npm install
* npm run dev


###  Library/Tools used
* Vite
* React / Typescript
* React query
* Mapbox GL
* Shadcn (Radix UI, Tailwind CSS)
* Jest / React testing library
* Postman
* Charles


### Errors encountered
* Encoutered cors issue since the API is third party
  - Remove cors in chrome : https://medium.com/@dmadan86/run-chrome-browser-without-cors-by-disabling-web-security-d124ad4dd2cf

### Needs Improvement
* UI design - did not spend time on the design itself due to time constraint.
* Loading list should use skeleton loader
* Tokens and other sensitive informations should be in .ENV file (better in server)
* Unit test - dont have enough time to add more
* UI add control to get current location.
* Search functionality -  users should have the capability to search for a specific string, and consider incorporating filtering options akin to Elastic Search for a more refined and efficient search experience.. 
