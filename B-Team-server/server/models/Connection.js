import { Schema } from 'mongoose'

const Connection = new Schema({
  user1: { type: Schema.Types.ObjectId, required: true },
  user2: { type: Schema.Types.ObjectId, required: true }
}, { timestamps: true, toJSON: { virtuals: true } })
Connection.virtual('sender', {
  localField: 'user1',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})
Connection.virtual('receiver', {
  localField: 'user2',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})
export default Connection
