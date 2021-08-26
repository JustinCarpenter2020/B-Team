
import { Schema } from 'mongoose'
const Post = new Schema(
  {
    body: { type: String, required: true },
    creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
    likedIds: [{ type: String, ref: 'Account' }],
    imgUrl: { type: String }
  },
  { timestamps: true, toJSON: { virtuals: true } }

)

Post.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})

export default Post
