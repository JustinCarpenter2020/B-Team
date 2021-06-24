
import { Schema } from 'mongoose'
const Post = new Schema(
  {
    body: { type: String, required: true },
    creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
    likes: { type: Number, required: true, default: 0 }
  },
  { timestamps: true, toJSON: { virtuals: true } }

)

Post.virtual('Creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})

export default Post
