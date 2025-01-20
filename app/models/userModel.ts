import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    clerkUserId: {type: String, unique: true, required: true},
    userName: { type: String, required: true},
    emailAddress: { type: String, required: true},
    firstName: { type: String, required: true},
    },
    {timestamps: true}
);

const MyUser = mongoose.models.MyUser || mongoose.model("MyUser", userSchema);

export default MyUser;