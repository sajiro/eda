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
* Search functionality - Should have the ability to search a string that the can filter like elastic search. 

  
### Mistakes
* Attempting Shadcn for the first time posed challenges for me as it was unfamiliar, resulting in additional time spent debugging configuration issues with Vite and TypeScript.
* Due to time constraint - , Temporarily used "as <type>" in TypeScript is considered a suboptimal practice because it essentially asserts to TypeScript that you know better than the type system. This can undermine the benefits of static typing, better use typeguards instead
* Spend time on playing around with the API and trying out posible combinations for searching(since im not sure about the abstraction of the API)
* After evaluating the problem or task at hand and planning the necessary tools and libraries, I begin the UI development. However, upon reflection, I realize the importance of concurrently initiating work on the API services within the frontend. This would provide valuable insights into the anticipated data and values, aiding in a more cohesive development process for both functionality and user interface.

