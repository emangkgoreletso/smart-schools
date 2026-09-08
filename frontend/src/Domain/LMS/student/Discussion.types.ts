export interface Reply {
  id: string;
  author: string;
  message: string;
  createdAt: string;
  parentReplyId?: string;
}

export interface Discussion {
  id: string;
  subjectId: string;

  title: string;
  message: string;

  author: string;
  createdAt: string;

  visibleToClasses: string[];

  replies: Reply[];

  pinned?: boolean;
}

