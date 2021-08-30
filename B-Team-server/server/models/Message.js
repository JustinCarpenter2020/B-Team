import { Schema } from 'mongoose'

const Message = new Schema({
  to: { type: Schema.Types.ObjectId, required: true },
  from: { type: Schema.Types.ObjectId, required: true },
  body: { type: String, required: true }
})
Message.virtual('sender', {
  localField: 'from',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})
export default Message
