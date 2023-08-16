import mongoose from "mongoose";
import { Types } from "mongoose";
const UserSchema = new mongoose.Schema(
    {
        firstName:String,
        lastName:String,
        email:String,
        gender:String,
        phone:String,
},
{timestamps:true});

const User = mongoose.model("Users", UserSchema);

export default User;