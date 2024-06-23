/**
 * 
 * @param {*} user token from frontend
 * @param {Response} res response from backend
 */
const checkToken = (token, res) => {

    let decodedToken = atob(token);

    let userEmail = decodedToken.split(":~}")[0];
    let userDateLogin = new Date(decodedToken.split(":~}")[1]);

    if (Date.now() - userDateLogin.getTime() > 60 * 60 * 1000) {
        var o = { status: "fail" };
        console.log("Token expired");
    }

    return userEmail;
}

module.exports = { checkToken };