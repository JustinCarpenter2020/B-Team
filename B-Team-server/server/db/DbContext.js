import mongoose from 'mongoose'
import { Value as ValueSchema } from '../models/Value'
import { AccountSchema } from '../models/Account'
import PostSchema from '../models/Post'
import CommentSchema from '../models/Comment'
import MessageSchema from '../models/Message'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);

  Messages = mongoose.model('Message', MessageSchema);

  Account = mongoose.model('Account', AccountSchema);

  Posts = mongoose.model('Post', PostSchema);

  Comments = mongoose.model('Comment', CommentSchema);
}

export const dbContext = new DbContext()
