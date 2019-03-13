import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  userType: {
    type: String,
    enum: ['customer', 'professional', 'admin']
  }
});

userSchema.pre('save', function (next) {
  let user = this;
  if (!user.isNew) {    
    next();
  }
  console.log('pre user-save')  
  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) return next(err);
    user.password = hash;
    next();
  });
});


userSchema.statics.authenticate = function (email, password, callback) {
  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        let err = new Error('This email is not currently registered :(');
        err.status = 401;
        return callback(err);
      }
      // check password
      bcrypt.compare(password, user.password, function (error, result) {
        if (result) {
          return callback(null, user);
        }
        let err = new Error('Invalid password. Try again :(');
        err.status = 401;
        return callback(err);
      });
    })
    .catch(err => {
      return callback(err);
    });

};

const User = mongoose.model('User', userSchema);
export default User;