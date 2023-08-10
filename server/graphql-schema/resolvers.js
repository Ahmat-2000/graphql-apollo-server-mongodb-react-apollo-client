const UserModel = require('../model/Users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {GraphQLError} = require('graphql');
// Resolvers define how to fetch the types defined in your schema.
const resolvers = {  
    Query: {
        getAllUsers: async () => {
            return await UserModel.find();
        },
        getUserByName: async(parent, {name}, context, info) => {
            return await UserModel.findOne({firstName: name});
        }
    },

    Mutation: {
        sinUp: async (parent, {user}, context, info) => {
            const oldUser = await UserModel.findOne({email: user.email}, {__v: 0});
            // if a user already exist with this mail
            if(oldUser) throw new GraphQLError(`User already exist with this email ${user.email}`,{extensions: { code: 'USER_ALREADY_EXIST'}});
            // create a new user instance of UserModel
            const newUser = new UserModel({
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                password: await bcrypt.hash(user.password,10),
                age: user.age
            });
            // save the new user in the collection UserModel
            const res = await newUser.save(); // MongoDb saving
            const SECRET_KEY = "secret key";
            // create token
            res.token =jwt.sign({userId : res._id}, SECRET_KEY);
            return res;
        },
        deleteUser: async (parent, {userId}, context, info) => {
            // deleteCount will return 1 if the User was deleted and 0 if not deleted
            const wasDeleted = await UserModel.deleteOne({_id: userId});
            //console.log(wasDeleted.deletedCount);
            return wasDeleted.deletedCount === 1 ? true : false;
        },
        updateUser: async (parent, {userId, userInput}, context, info) => {
            const res = await UserModel.findByIdAndUpdate({_id: userId}, userInput,{ new: true });
            //console.log(res);
            return res ? true : false;
        },
        login: async (parent,{email, password}) => {
            const user = await UserModel.findOne({email: email}, {__v: 0});
            // if no user with this mail
            if(!user) throw new GraphQLError(`There is no user with this email ${email}`,{extensions: { code: 'NOT_SUCH_USER'}});
            // if there a user with this mail then check the password
            const isPassword = await bcrypt.compare(password, user.password);
            if(!isPassword) throw new GraphQLError(`Password is incorrect`,{extensions: { code: 'INVALID_PASSWORD'}});
            // if password match then create a token
            const SECRET_KEY = "secret key";
            const token = jwt.sign({userId : user._id}, SECRET_KEY);
            user.token = token;
            return user;
        },
    }
};

module.exports = {resolvers};