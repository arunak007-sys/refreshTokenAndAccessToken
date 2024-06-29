import mongoose, { Schema } from "mongoose";

const userTokenSchema = new mongoose.Schema({
    userId:{
        type:Schema.Types.ObjectId,
        required: true,
        ref:'User'
    },
    token:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        required:true,
        default:Date.now(),
        expires: 30 * 86400 
    }
})

const UserToken = mongoose.model('UserToken',userTokenSchema);

export default UserToken;