const { ClerkExpressWithAuth } = require('@clerk/clerk-sdk-node');

const clerkMiddleware = ClerkExpressWithAuth({
  secretKey: process.env.CLERK_SECRET_KEY,
});

module.exports = clerkMiddleware;