### The Task
#### The task:

* Write a program to display charts from data found in Wikipedia tables
* The program should accept a URL and then display the chart of that data
* The front end should be in a browser (framework or not, your choice)
* The backend should be in Node JS (or any other language of your choice)
* The input is any Wikipedia URL, e.g.,https://en.wikipedia.org/wiki/Women%27s_high_jump_world_record_progression
* The back end should access the URL, scan the page for a table with numbers
* find one or more numeric columns
* return the data back to the front end for display
* The front end should turn the data into a chart and show it to the user

#### Additional notes (IMPORTANT):

* Keep your solutions simple. No need to spend more than a couple of hours on it
* Make any assumptions you feel necessary to deliver value and document them
* We are interested in your holistic approach to development, not just the code
* Please add one wow features of your choice to impress your users

### To test the app

* To install dependencies: `yarn install`
* To run ExpressJS server: `yarn run server`
* To run ReactJS app: `yarn start`

### Clarification
* Numeric column = Cell data can be `parseFloat` ed
* If multiple suitable tables are found on the page, the app will use the first one.
* The app shows a list of data if there's only one numeric column found
* It will show a bar chart if 2 numeric columns are found
* Currently, only support 1 or 2 numeric columns. More numeric columns will be ignored
* The app is not smart enough to figure out which data is more suitable to be the X and Y axis. e.g. '8 Medals' is obviously more appropriate to be the Y axis compared to '2021', however the app won't know.
* Minimum test coverage was added for the purpose of demonstrating the idea only

### Tasks planned / carried out
* Form input and post data handling
* URL validation
* Parse dumped html and identify suitable tables
* Server side error handling, e.g. no suitable tables found
* Convert table numeric column data into an array of json and send it back to the frontend
* Handle different situation: 1-dimensional data and 2-dimensional data
* Convert the data into the format can be used by React Vis
* Unit test for util function for both frontend and backend
* Test frontend component rendering