
export interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  isRead: boolean;
  avatar: string;
}

export interface Chat {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  avatar: string;
}

export interface Group {
  id: string;
  name: string;
  description: string;
  members: number;
  lastActive: string;
  avatar: string;
}

export interface Notification {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  isRead: boolean;
  type: "message" | "payment" | "deadline" | "system";
}
