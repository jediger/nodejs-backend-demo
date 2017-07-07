function isEmpty(string) {
	return !string || string == '';
}

function isPositiveInt(number) {
	var intVal = Math.floor(number);
	return intVal === number && number >= 0;
}

module.exports = {
	validPassword: function(password) {

	},
	validUser: function(_user) {
		var user = {
			username: _user.username.trim(),
			age: Number(_user.age),
			gender: _user.gender.trim(),
			password: _user.password.trim()
		};
		if(!isEmpty(user.username) && isPositiveInt(user.age) && this.validPassword(user.password)) {
			return user;
		} else {
			
		}
	}
};
