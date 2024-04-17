import mongoose, { Schema } from 'mongoose';

const TokenSchema = mongoose.Schema(
    {
        userId: {
           type: Schema.Types.ObjectId,
           ref: "User",
           required: true
        },
        token: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            expires: 300
        }
    }
)

export default mongoose.model("Token",TokenSchema);