const axios = require('axios');

async function GetUser(userID) {
	const config = {
		method: 'get',
		url: 'https://api.onepeloton.com/api/user/' + userID,
		headers: {
			'Cookie':  'peloton_session_id=' + process.env.PELOTON_SESSION_ID,
		},
	};
	try {
		const res = await axios(config)
			.then(function(response) {
				return response;
			})
			.catch(function(error) {
				console.log(error);
				throw new Error('Could not get user=' + userID);
			});
		return res;
	}
	catch (error) {
		throw new error;
	}


}

module.exports = {
	GetUser,
};
