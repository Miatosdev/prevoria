import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, Check, X, AlertTriangle, Info, DollarSign, Calendar } from 'lucide-react';

interface Notification {
  id: string;
  type: 'info' | 'warning' | 'success' | 'payment' | 'security';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

interface NotificationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NotificationModal: React.FC<NotificationModalProps> = ({ open, onOpenChange }) => {
  const notifications: Notification[] = [
    {
      id: '1',
      type: 'payment',
      title: 'Payment Received',
      message: 'You received $1,250.00 from Sarah Johnson',
      timestamp: '2 minutes ago',
      read: false
    },
    {
      id: '2',
      type: 'warning',
      title: 'Low Balance Alert',
      message: 'Your checking account balance is below $500',
      timestamp: '1 hour ago',
      read: false
    },
    {
      id: '3',
      type: 'security',
      title: 'Login from New Device',
      message: 'We detected a login from a new device in New York',
      timestamp: '3 hours ago',
      read: true
    },
    {
      id: '4',
      type: 'info',
      title: 'Monthly Statement Available',
      message: 'Your January statement is ready for download',
      timestamp: '1 day ago',
      read: true
    },
    {
      id: '5',
      type: 'success',
      title: 'Transfer Completed',
      message: 'Your transfer of $500 to savings account was successful',
      timestamp: '2 days ago',
      read: true
    }
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'payment':
        return <DollarSign className="h-5 w-5 text-success" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-warning" />;
      case 'security':
        return <AlertTriangle className="h-5 w-5 text-destructive" />;
      case 'success':
        return <Check className="h-5 w-5 text-success" />;
      default:
        return <Info className="h-5 w-5 text-primary" />;
    }
  };

  const getNotificationBadge = (type: string) => {
    const variants = {
      payment: 'default',
      warning: 'destructive',
      security: 'destructive',
      success: 'secondary',
      info: 'outline'
    } as const;

    return variants[type as keyof typeof variants] || 'outline';
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Bell className="h-5 w-5 mr-2" />
              Notifications
            </div>
            {unreadCount > 0 && (
              <Badge variant="destructive" className="ml-2">
                {unreadCount} new
              </Badge>
            )}
          </DialogTitle>
          <DialogDescription>
            Stay updated with your account activity
          </DialogDescription>
        </DialogHeader>

        <div className="max-h-96 overflow-y-auto space-y-3">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-3 rounded-lg border ${
                notification.read ? 'bg-muted/30' : 'bg-primary/5 border-primary/20'
              } hover:bg-muted/50 transition-colors`}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-0.5">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-sm">{notification.title}</h4>
                    {!notification.read && (
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {notification.message}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {notification.timestamp}
                    </span>
                    <Badge variant={getNotificationBadge(notification.type)} className="text-xs">
                      {notification.type}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex space-x-2 pt-4">
          <Button variant="outline" size="sm" className="flex-1">
            Mark All as Read
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            <X className="h-4 w-4 mr-1" />
            Clear All
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};