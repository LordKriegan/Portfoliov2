//setup dev env
let isDev = false;
if (process.env.NODE_ENV === 'development') {
    isDev = true;
    require('dotenv').config();
}
//dependencies
const express = require('express');
const path = require('path');

//express setup
const port = process.env.PORT || 3001;
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//create routes
if (!isDev) {
    app.use(express.static(path.join(__dirname + '/client/build')));
}
app.use("/api", require('./routes/routes'));
//start server
app.listen(port, () => {
    console.log("App listening on PORT " + port);
});