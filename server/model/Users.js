const {model, Schema} = require('mongoose');
const AutoIncrementModel = require('./AutoIncrement');

const userSchema = new Schema({
    _id: Number,
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    age: Number
});

// document midlleware to auto incremente the id
userSchema.pre('save', async function (next) {
    if (!this.isNew) {
      return next(); // Skip if not a new document
    }
    try {
      const counter = await AutoIncrementModel.findByIdAndUpdate(
        { _id: 'user' }, // Counter name, adjust as needed
        { $inc: { count: 1 } },
        { upsert: true, new: true }
      );
      this._id = counter.count;
      next();
    } catch (error) {
      next(error);
    }
  });
  
const UserModel = model('UserModel', userSchema);
module.exports = UserModel;