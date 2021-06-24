import { Schema } from 'mongoose'

const Comment = new Schema({
  body: { type: String, required: true },
  creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
  postId: { type: String, required: true, ref: 'Post' },
  commentLikes: [{ type: String, ref: 'Account' }]
},
{ timestamps: true, toJSON: { virtuals: true } })

Comment.virtual('Creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})
export default Comment
