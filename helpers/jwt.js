const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

function authenticate() { jwt({
    // Dynamically provide a signing key based on the kid in the header and the singing keys provided by the JWKS endpoint.
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://innt.eu.auth0.com/.well-known/jwks.json'
    }),

    // Validate the audience and the issuer.
    audience: 'https://innt.eu.auth0.com/userinfo',
    issuer: 'https://innt.eu.auth0.com',
    algorithms: ['RS256'],
    function(req, res) {
        if (!req.user.admin) {
            return res.sendStatus(401);
        } else {
            res.sendStatus(200);
        }
    }
})};

module.exports = {
    authenticate: authenticate
};