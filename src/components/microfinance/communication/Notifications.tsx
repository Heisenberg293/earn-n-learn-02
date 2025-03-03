
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, MessageCircle, Clock } from "lucide-react";
import { DollarSign } from "lucide-react";
import { Notification } from "../types/communication-types";
import { MOCK_NOTIFICATIONS } from "../data/mock-data";

const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);
  
  // Handle marking a notification as read
  const handleMarkNotificationRead = (id: string) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, isRead: true } : notification
    ));
  };
  
  // Handle marking all notifications as read
  const handleMarkAllRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, isRead: true })));
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-accent" />
          Notifications
        </CardTitle>
        <CardDescription>
          Stay updated on messages, payments, and deadlines
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {notifications.length === 0 ? (
          <p className="text-center text-muted-foreground py-6">No notifications</p>
        ) : (
          notifications.map((notification) => (
            <div 
              key={notification.id}
              className={`p-3 rounded-lg border ${!notification.isRead ? 'bg-accent/10' : ''}`}
              onClick={() => handleMarkNotificationRead(notification.id)}
            >
              <div className="flex justify-between items-start">
                <div className="flex gap-3 items-start">
                  <div className={`rounded-full p-2 
                    ${notification.type === 'message' ? 'bg-blue-100 text-blue-700' : 
                      notification.type === 'payment' ? 'bg-green-100 text-green-700' :
                      notification.type === 'deadline' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-purple-100 text-purple-700'}`}
                  >
                    {notification.type === 'message' ? <MessageCircle className="h-4 w-4" /> :
                     notification.type === 'payment' ? <DollarSign className="h-4 w-4" /> :
                     notification.type === 'deadline' ? <Clock className="h-4 w-4" /> :
                     <Bell className="h-4 w-4" />}
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">{notification.title}</h4>
                    <p className="text-sm text-muted-foreground">{notification.description}</p>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">{notification.timestamp}</div>
              </div>
              {!notification.isRead && (
                <div className="flex justify-end mt-2">
                  <Button variant="ghost" size="sm" onClick={() => handleMarkNotificationRead(notification.id)}>
                    Mark as read
                  </Button>
                </div>
              )}
            </div>
          ))
        )}
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" onClick={handleMarkAllRead}>Mark all as read</Button>
      </CardFooter>
    </Card>
  );
};

export default Notifications;
