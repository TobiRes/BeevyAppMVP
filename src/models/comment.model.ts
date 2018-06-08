export interface EventComment {
  commentID: string;
  author: string;
  authorID: string;
  createdAt: string;
  commentBody: string;
  comments?: Comment[];
}

export interface CommentDTO {
  userID: string;
  userToken: string;
  eventID: string;
  repliedTo?: string;
  commentBody: string;
  commentTime: string;
}
