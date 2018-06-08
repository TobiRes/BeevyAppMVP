export interface EventComment {
  commentID: string;
  author: string;
  authorID: string;
  createdAt: string;
  commentBody: string;
  comments?: Comment[];
}
