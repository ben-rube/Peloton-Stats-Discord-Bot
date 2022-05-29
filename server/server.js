const express = require('express');
const app = express();

app.get('/', (req, res) => {
	res.send('Hello World!');
});

// Starts HTTP Server
module.exports = function(port) {
	app.listen(port, () => {
		console.log(`Example app listening on port ${port}`);
	});
};

