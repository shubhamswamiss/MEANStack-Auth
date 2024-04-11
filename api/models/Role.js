import mongoose from 'mongoose';

const RoleSchema = mongoose.Schema(
    {
        role:{
            type:String,
            required:true
        }
    },
    {
        timestamps: {
            currentTime: () => new Date().toLocaleString("en-US", {timeZone: "Asia/Kolkata"})
        }
       
    }
);

export default mongoose.model('Role',RoleSchema);