import jsonwebtoken from "jsonwebtoken";

const secretPrivateKey = "$urlFSapp$";

function getToken(user) {
	return jsonwebtoken.sign(
		{
			...user,
			_id: user._id,
			userName: user.userName,
			userRole: user.userRole,
			isUserLoggedin: user.isUserLoggedin,
		},
		secretPrivateKey,
	);
}

function getUser(token) {
	if (!token) return null;
	try {
		return jsonwebtoken.verify(token, secretPrivateKey);
	} catch (error) {
		console.log("no-user", error);
		return null;
	}
}

export { getToken, getUser };
