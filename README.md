# Earth daily analytics demo

### How to start the app: run the following commands in your terminal
* npm install
* npm run dev


###  Library/Tools used
* Vite
* React / Typescript
* React query
* Mapbox GL
* Shadcn (Radix UI, Tailwind CSS)
* Jest / React testing library


### Errors encountered
* Encoutered cors issue since the API is third party
  - Remove cors in chrome : https://medium.com/@dmadan86/run-chrome-browser-without-cors-by-disabling-web-security-d124ad4dd2cf

### Needs Improvement
* UI design - did not spend time on the design itself due to time constraint.
* Loading list should use skeleton loader
* Tokens and other sensitive informations should be in .ENV file (better in server)
* Unit test - dont have enough time to add more

  
### Mistakes
* Attempting Shadcn for the first time posed challenges for me as it was unfamiliar, resulting in additional time spent debugging configuration issues with Vite and TypeScript.
* Spend time on playing around with the API and trying out posible combinations for searching(since im not sure about the abstraction of the API)
* After evaluating the problem or task at hand and planning the necessary tools and libraries, I begin the UI development. However, upon reflection, I realize the importance of concurrently initiating work on the API services within the frontend. This would provide valuable insights into the anticipated data and values, aiding in a more cohesive development process for both functionality and user interface.

