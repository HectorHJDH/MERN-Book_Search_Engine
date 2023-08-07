const jwt = require('jsonwebtoken');

// set token secret and expiration date
const secret = 'mysecretsshhhhh';
const expiration = '2h';

// Update the authMiddleware function to work with the GraphQL API
function authMiddleware({ req }) {
  // allows token to be sent via req.headers.authorization
  let token = req.headers.authorization || '';

  if (token.startsWith('Bearer ')) {
    // Remove 'Bearer ' from the token string
    token = token.slice(7, token.length).trim();
  }

  if (!token) {
    // If no token is provided, set user to null in the context
    return { user: null };
  }

  try {
    // Verify token and get user data out of it
    const { data } = jwt.verify(token, secret, { maxAge: expiration });
    // Set the user data in the context object
    return { user: data };
  } catch (err) {
    console.log('Invalid token', err);
    // If token verification fails, set user to null in the context
    return { user: null };
  }
}

module.exports = { authMiddleware };
