/** An article. */
export interface IArticle {
  /** Unique idendifier. */
  _id: string;
  /** The title of article. */
  title: string;
  /** The text of article. */
  text: string;
  /** When the article has been created. */
  createdAt: Date;
}
