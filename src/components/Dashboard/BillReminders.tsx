import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Zap, Wifi, Home, Phone, AlertCircle } from 'lucide-react';

interface Bill {
  id: string;
  name: string;
  amount: number;
  dueDate: Date;
  status: 'upcoming' | 'due-soon' | 'overdue';
  category: 'utilities' | 'internet' | 'phone' | 'rent' | 'other';
  autopay: boolean;
}

export const BillReminders: React.FC = () => {
  const bills: Bill[] = [
    {
      id: '1',
      name: 'Electric Bill',
      amount: 125.50,
      dueDate: new Date('2024-02-01'),
      status: 'upcoming',
      category: 'utilities',
      autopay: true
    },
    {
      id: '2',
      name: 'Internet Service',
      amount: 79.99,
      dueDate: new Date('2024-01-28'),
      status: 'due-soon',
      category: 'internet',
      autopay: false
    },
    {
      id: '3',
      name: 'Phone Bill',
      amount: 65.00,
      dueDate: new Date('2024-01-25'),
      status: 'overdue',
      category: 'phone',
      autopay: false
    },
    {
      id: '4',
      name: 'Rent Payment',
      amount: 1200.00,
      dueDate: new Date('2024-02-01'),
      status: 'upcoming',
      category: 'rent',
      autopay: true
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'text-muted-foreground';
      case 'due-soon': return 'text-warning';
      case 'overdue': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-muted/20';
      case 'due-soon': return 'bg-warning/10 border-warning/20';
      case 'overdue': return 'bg-destructive/10 border-destructive/20';
      default: return 'bg-muted/20';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'utilities': return Zap;
      case 'internet': return Wifi;
      case 'phone': return Phone;
      case 'rent': return Home;
      default: return Clock;
    }
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return `${Math.abs(diffDays)} days overdue`;
    if (diffDays === 0) return 'Due today';
    if (diffDays === 1) return 'Due tomorrow';
    return `Due in ${diffDays} days`;
  };

  return (
    <Card className="banking-card">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            Bill Reminders
          </span>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </CardTitle>
        <CardDescription>Upcoming bills and payment reminders</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {bills.map((bill) => {
            const IconComponent = getCategoryIcon(bill.category);
            return (
              <div 
                key={bill.id} 
                className={`p-3 rounded-lg border transition-colors ${getStatusBg(bill.status)}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                      <IconComponent className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <p className="font-medium text-sm">{bill.name}</p>
                        {bill.status === 'overdue' && (
                          <AlertCircle className="h-4 w-4 text-destructive" />
                        )}
                      </div>
                      <p className={`text-xs ${getStatusColor(bill.status)}`}>
                        {formatDate(bill.dueDate)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm">${bill.amount.toFixed(2)}</p>
                    {bill.autopay && (
                      <p className="text-xs text-success">Auto-pay enabled</p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 pt-4 border-t">
          <Button className="w-full" variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Payment
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};