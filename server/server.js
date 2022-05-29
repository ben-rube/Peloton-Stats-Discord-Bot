const express = require('express');
const app = express();

app.get('/', (req, res) => {
	res.send('Hello World!');
});


export function InitServer(port) {
	app.express.listen(port, () => {
		console.log(`Example app listening on port ${port}`);
	});
}
