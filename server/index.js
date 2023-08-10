const {ApolloServer} = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const mongoose = require('mongoose');
const {typeDefs} = require('./graphql-schema/typeDefs');
const {resolvers} = require('./graphql-schema/resolvers');

const MONGODB_URL = "mongodb+srv://louky:louky6848@cluster0.ugte8xg.mongodb.net/?retryWrites=true&w=majority";

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        const token = req.headers.authorization || '';
        let userId;
    
        try {
          userId = jwt.verify(token, JWT_SECRET).userId;
        } catch (error) {
          userId = null;
        }
    
        return { userId };
    }
});

// connect to mongodb and start the apolloServer
mongoose.connect(MONGODB_URL)
.then(() => {
    console.log("You successfully connected to MongoDB!");
    // Passing an ApolloServer instance to the `startStandaloneServer` function: 
    //  1. creates an Express app 
    //  2. installs your ApolloServer instance as middleware
    //  3. prepares your app to handle incoming requests
    startStandaloneServer(apolloServer, {listen: { port: 4000 },})
    .then(({ url }) => console.log(`🚀  Server ready at: ${url}`));

})


