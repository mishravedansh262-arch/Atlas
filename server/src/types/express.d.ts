import type { IUser } from '../models/user.model.js';

/**
 * Augment the Express Request type so `req.user` is available
 * after the `protect` middleware has run.
 */
declare module 'express' {
  interface Request {
    /** Populated by the `protect` middleware after JWT verification. */
    user?: import('mongoose').Document<unknown, object, IUser> &
    IUser & { _id: import('mongoose').Types.ObjectId } & import('../models/user.model.js').IUserMethods;
  }
}
