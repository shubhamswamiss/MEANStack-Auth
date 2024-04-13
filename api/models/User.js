import mongoose,{Schema} from 'mongoose';

const UserSchema = mongoose.Schema(
    {
        firstName:{
            type: String,
            required: true
        },
        lastName:{
            type: String,
            required:true
        },
        username: {
            type: String,
            required:true,
            unique:true 
        },
        email: {
            type: String,
            required:true,
            unique:true 
        },
        password: {
            type: String,
            required:true
        },
        profileImage: {
            type: String,
            required: false,
            default: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pngwing.com%2Fen%2Fsearch%3Fq%3Duser&psig=AOvVaw0vz4c6UL_EoaOkIz8eXa_c&ust=1712839748296000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCLivr7jXt4UDFQAAAAAdAAAAABAE'
        },
        isAdmin: {
            type: Boolean,
            default: true
        },
        roles: {
            type: [Schema.Types.ObjectId],
            ref:'Role',
            required: true
        }
    },
    {
         timestamps: true
    }
);

export default mongoose.model('User', UserSchema);
