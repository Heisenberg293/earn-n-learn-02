
import { Chat, Message, Group, Notification } from "../types/communication-types";

export const MOCK_CHATS: Chat[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    lastMessage: "Can we talk about the project deadline?",
    timestamp: "10:32 AM",
    unread: 2,
    avatar: "SJ"
  },
  {
    id: "2",
    name: "Mike Thompson",
    lastMessage: "I've sent the payment for the textbooks",
    timestamp: "Yesterday",
    unread: 0,
    avatar: "MT"
  },
  {
    id: "3",
    name: "Alex Rodriguez",
    lastMessage: "Thanks for helping with the math assignment!",
    timestamp: "Monday",
    unread: 0,
    avatar: "AR"
  }
];

export const MOCK_MESSAGES: Message[] = [
  {
    id: "1",
    sender: "Sarah Johnson",
    content: "Hey, do you have time to discuss the group project today?",
    timestamp: "10:15 AM",
    isRead: true,
    avatar: "SJ"
  },
  {
    id: "2",
    sender: "You",
    content: "Sure, I'm free after 3 PM. What specifically did you want to go over?",
    timestamp: "10:20 AM",
    isRead: true,
    avatar: "YO"
  },
  {
    id: "3",
    sender: "Sarah Johnson",
    content: "I'm struggling with the research section and wanted to see if we could divide the work differently.",
    timestamp: "10:25 AM",
    isRead: true,
    avatar: "SJ"
  },
  {
    id: "4",
    sender: "Sarah Johnson",
    content: "Also, do you know if the deadline is still next Friday or did Professor Wilson extend it?",
    timestamp: "10:32 AM",
    isRead: false,
    avatar: "SJ"
  }
];

export const MOCK_GROUPS: Group[] = [
  {
    id: "1",
    name: "Business Finance Study Group",
    description: "Group for discussing business finance assignments and exam prep",
    members: 18,
    lastActive: "Today",
    avatar: "BF"
  },
  {
    id: "2",
    name: "Campus Entrepreneurship Club",
    description: "For students interested in startups and business ideas",
    members: 42,
    lastActive: "Yesterday",
    avatar: "CE"
  },
  {
    id: "3",
    name: "Peer Tutoring Network",
    description: "Connect with other students for academic help",
    members: 27,
    lastActive: "3 days ago",
    avatar: "PT"
  }
];

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    title: "New Message",
    description: "Sarah Johnson sent you a message",
    timestamp: "10:32 AM",
    isRead: false,
    type: "message"
  },
  {
    id: "2",
    title: "Payment Received",
    description: "You received $50 from Mike Thompson for textbooks",
    timestamp: "Yesterday",
    isRead: false,
    type: "payment"
  },
  {
    id: "3",
    title: "Deadline Reminder",
    description: "Your loan repayment is due in 3 days",
    timestamp: "Yesterday",
    isRead: true,
    type: "deadline"
  },
  {
    id: "4",
    title: "System Update",
    description: "New features have been added to the platform",
    timestamp: "Monday",
    isRead: true,
    type: "system"
  }
];
