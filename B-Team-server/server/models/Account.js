import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const AccountSchema = new Schema(
  {
    subs: [{ type: String, unique: true }],
    email: { type: String, lowercase: true, unique: true },
    name: { type: String, required: true },
    picture: { type: String },
    bio: { type: String },
    banner: { type: String, default: 'https://business.twitter.com/content/dam/business-twitter/textured-backgrounds/banner-full-blue-scratch.jpg.twimg.1280.jpg' }
    // following: []
    // NOTE If you wish to add additional public properties for Accounts do so here
  },
  { timestamps: true, toJSON: { virtuals: true } }
)
