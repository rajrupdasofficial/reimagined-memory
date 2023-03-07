const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    password: { type: String, required: true },
}, { timestamps: true });

UserSchema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(16);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    next();
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
