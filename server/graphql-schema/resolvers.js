const UserModel = require('../model/Users');

// Resolvers define how to fetch the types defined in your schema.
const resolvers = {  
    Query: {
        users: async () => {
            return await UserModel.find();
        },
        userByName: async(parent, {name}, context, info) => {
            return await UserModel.findOne({firstName: name});
        }
    },

    Mutation: {
        createUser: async (parent, {userToAdd}, context, info) => {
            const createuser = new UserModel({
                firstName: userToAdd.firstName,
                lastName: userToAdd.lastName,
                email: userToAdd.email,
                password: userToAdd.password,
                age: userToAdd.age
            });
            const res = await createuser.save(); // MongoDb saving

            return {
                id: res.id,
                ...res._doc
            }
        },
        deleteUser: async (parent, {userId}, context, info) => {
            // deleteCount will return 1 if the User was deleted and 0 if not deleted
            const wasDelete = await UserModel.deleteOne({_id: ID}).deletedCount;
        },
        editUser: (parent, {name}, context, info) => {
            return await ;
        },
    } 
};

module.exports = {resolvers};