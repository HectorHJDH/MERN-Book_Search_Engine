const express = require('express');
const { ApolloServer } = require('apollo-server-express'); // ApolloServer
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');
const { typeDefs, resolvers } = require('./schemas'); // GraphQL schema and resolvers

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// Step 3: Create an instance of Apollo Server and apply it as middleware
const server = new ApolloServer({
  typeDefs, // GraphQL schema
  resolvers, // GraphQL resolvers
});

// Apply Apollo Server as middleware to the Express server
server.applyMiddleware({ app });

app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});
