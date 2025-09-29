import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, Clock, BarChart3, Calendar } from 'lucide-react';

export const AccountStats: React.FC = () => {
  return (
    <Card className="banking-card">
      <CardHeader>
        <CardTitle className="text-lg">Account Statistics</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
              <DollarSign className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Transaction Limit</p>
              <p className="font-semibold">$500,000.00</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between p-3 bg-warning/5 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-warning/20 rounded-full flex items-center justify-center">
              <Clock className="h-5 w-5 text-warning" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Pending Transactions</p>
              <p className="font-semibold">$0.00</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between p-3 bg-success/5 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-success/20 rounded-full flex items-center justify-center">
              <BarChart3 className="h-5 w-5 text-success" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Transaction Volume</p>
              <p className="font-semibold">$200,000.00</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between p-3 bg-secondary/5 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-secondary/20 rounded-full flex items-center justify-center">
              <Calendar className="h-5 w-5 text-secondary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Account Age</p>
              <p className="font-semibold">1 month</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};