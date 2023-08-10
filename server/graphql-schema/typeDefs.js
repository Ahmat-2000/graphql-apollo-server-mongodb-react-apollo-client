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
    token: String
  }
  input userInput{
    firstName: String
    lastName: String
    email: String
    password: String
    age: Int
  }
  # Todos
  type Todos{
    _id: Int!
    task: String!
    isDone: Boolean!
  }
  input todosInput{
    task: String!
    isDone: Boolean = false
  }
  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "users" query returns an array of zero or more users (defined above).
  type Query {
    # Users queries
    getAllUsers: [User!]
    getUserByName(name: String!): User

    # Todos queries
    getAllTodos: [Todos!]
    getTodosByIsDone(isDone: Boolean!): [Todos!]
  }

  type Mutation {

    # mutations for users
    deleteUser(userId: ID!): Boolean!
    updateUser(userId: ID!, userInput: userInput!): Boolean

    # authotentification
    sinUp(user: userInput!): User!    #It's called when a user sinUp
    login(email: String!, password: String!): User!

    # mutations for todos
    addTodos(todosInput: todosInput!): [Todos]
    deleteTodosById(todosId: ID!): Boolean!
    updateTodos(todosId: ID!): Boolean!
  } 
`;

module.exports = {typeDefs};