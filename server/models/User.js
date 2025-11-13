import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    _id: {type: String, required: true},
    email: {type: String, required: true},
    full_name: {type: String, required: true},
    username: {type: String, unique: true},
    bio: {type: String, default: "Hey! there"},
    cover_photo: {type: String, default: ""},
    profile_photo: {type: String, default: ""},
    location: {type: String, default: ""},
    followers: [{type: String, ref: ""}],
    following: [{type: String, ref: ""}],
    followers: [{type: String, ref: ""}],
}, {timestamps: true, minimize:false});

const User = mongoose.model('User', userSchema);

export default User;