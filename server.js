//setup dev env
let isDev = false;
if (process.env.NODE_ENV === 'development') {
    isDev = true;
    require('dotenv').config();
}
//dependencies
const express = require('express');
const path = require('path');
const db = require('./models');
//express setup
const port = process.env.PORT || 3001;
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//create routes
app.use("/api", require('./routes/routes'));

if (!isDev) {
    app.use(express.static(path.join(__dirname + '/client/build')));
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname + '/client/build/index.html'));
    });
}


//start server
db.sequelize.sync({force: isDev}).then(function() {
    app.listen(port, function() {
        console.log("App listening on PORT " + port);
    });
});