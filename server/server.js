const {ApolloServer} = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { MongoClient, ServerApiVersion } = require('mongodb');
const {typeDefs} = require('./graphql-schema/typeDefs');
const {resolvers} = require('./graphql-schema/resolvers');
const MONGODB_URL = "mongodb+srv://louky:louky6848@cluster0.ugte8xg.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const mongoClient = new MongoClient(MONGODB_URL, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await mongoClient.connect();
        // Send a ping to confirm a successful connection
        await mongoClient.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
        // Passing an ApolloServer instance to the `startStandaloneServer` function: 
        //  1. creates an Express app 
        //  2. installs your ApolloServer instance as middleware
        //  3. prepares your app to handle incoming requests
        startStandaloneServer(apolloServer, {listen: { port: 4000 },})
        .then(({ url }) => console.log(`🚀  Server ready at: ${url}`));

    } finally {
      // Ensures that the client will close when you finish/error
      await mongoClient.close();
    }
}
run().catch(console.dir);
