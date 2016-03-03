# Trading Tile: Clients

### Summary
This repository is home to a number of example codebases, all achieving the same end result but utilising different frameworks and libraries to get there.

The purpose of this exercise is to introduce to the reader the differences between 3 different client-side architectural choices:

- Vanilla JS (with JQuery)
- Angular (not Angular2)
- ReactJS (and Flux)

We are not accepting contributions at this time, but if you found this helpful, let us know by starring this repository, or getting in touch at `hello@digiterre.com`!

### Back-end
There is a complimentry repository containing the code for the back-end - supporting the interaction with this simple trade tile example. You can find this [here](https://github.com/Digiterre/trading-tile-server).

We also have a sample back end hosted in the cloud at the following URL: `http://tradingtileserver.azurewebsites.net`.

### Running the samples

#### Vanilla JS
-	`cd` into `jquery-client` directory
-	`npm install`
-	`npm install –g webpack`
-	`npm install –g webpack-dev-server`
-	`webpack-dev-server --inline`
-	browse to `http://localhost:8080`


#### Angular
-	`cd` into `ng-client` directory
-	`npm install`
-	ensure you have installed gulp globally with `npm install -g gulp`
-	`gulp`
-	browse to `http://localhost:9005`


#### ReactJS

-	`cd` into `react-standard-flux`
-	npm install`
-	ensure you have installed gulp globally with `npm install -g gulp`
-	`gulp`
-	browse to `localhost:9005`

Copyright 2016 Digiterre Agility Ltd.
