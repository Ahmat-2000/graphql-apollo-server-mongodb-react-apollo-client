const {model, Schema} = require('mongoose');
const AutoIncrementModel = require('./AutoIncrement');

const todosSchema = new Schema({
    _id: Number,
    description: String,
    isDone: Boolean
});

// document midlleware to auto incremente the id
todosSchema.pre('save', async function (next) {
    if (!this.isNew) {
      return next(); // Skip if not a new document
    }
    try {
      const counter = await AutoIncrementModel.findByIdAndUpdate(
        { _id: 'todos' }, // Counter name, adjust as needed
        { $inc: { count: 1 } },
        { upsert: true, new: true }
      );
      this._id = counter.count;
      next();
    } catch (error) {
      next(error);
    }
  });
  
const UserModel = model('UserModel', todosSchema);
module.exports = UserModel;