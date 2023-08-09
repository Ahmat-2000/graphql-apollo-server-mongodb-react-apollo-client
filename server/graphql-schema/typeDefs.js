// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.
  # This "User" type defines the queryable fields for every user in our data source.
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    age: Int!
  }
  input userInput{
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    age: Int = 18 # by default age is 18
  }
  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "users" query returns an array of zero or more users (defined above).
  type Query {
    users: [User!]
    userByName(name: String!): User
  }

  type Mutation {
    createUser(userToAdd: userInput!): User!
    deleteUser(userId: ID!): Boolean
    editUser(userId: ID!, userInput: userInput): Boolean
  } 
`;

module.exports = {typeDefs};