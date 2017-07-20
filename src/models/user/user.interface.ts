/** A registered user. */
export interface IUser {
  /** Unique idendifier. */
  _id: string;
  /** The user's email. */
  email: string;
  /** The user's password. */
  password: string;
  /** When the user has been created. */
  createdAt: Date;
}
