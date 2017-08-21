var express = require('express'),
    path = require('path'),
    app = new express(),
    bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname,'public')));

require('./config')(app);

app.listen(3009, function() {
	console.log("Started listening on port 3009!!!!");
});
