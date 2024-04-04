const withAuth = (req, res, next) => {
    if (!req.session.loggedIn) {
        res.redirect('/login');
    } else {
        next();
    }
};

module.exports = withAuth;
//if user is not logged in, redirect the request to the login route