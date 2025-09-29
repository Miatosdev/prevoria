import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { TrendingUp, ShoppingCart, Car, Home, Coffee, Gamepad2, BarChart3 } from 'lucide-react';

interface SpendingCategory {
  name: string;
  amount: number;
  percentage: number;
  color: string;
  icon: React.ElementType;
}

interface MonthlySpending {
  month: string;
  amount: number;
}

export const SpendingInsights: React.FC = () => {
  const spendingCategories: SpendingCategory[] = [
    { name: 'Food & Dining', amount: 485, percentage: 32, color: '#3B82F6', icon: Coffee },
    { name: 'Transportation', amount: 320, percentage: 21, color: '#10B981', icon: Car },
    { name: 'Shopping', amount: 275, percentage: 18, color: '#F59E0B', icon: ShoppingCart },
    { name: 'Housing', amount: 240, percentage: 16, color: '#EF4444', icon: Home },
    { name: 'Entertainment', amount: 195, percentage: 13, color: '#8B5CF6', icon: Gamepad2 }
  ];

  const monthlyData: MonthlySpending[] = [
    { month: 'Sep', amount: 1320 },
    { month: 'Oct', amount: 1450 },
    { month: 'Nov', amount: 1280 },
    { month: 'Dec', amount: 1580 },
    { month: 'Jan', amount: 1515 }
  ];

  const totalSpending = spendingCategories.reduce((sum, cat) => sum + cat.amount, 0);

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Spending by Category */}
      <Card className="banking-card">
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="h-5 w-5 mr-2" />
            Spending by Category
          </CardTitle>
          <CardDescription>This month's expense breakdown</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={spendingCategories}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="amount"
                  >
                    {spendingCategories.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`$${value}`, 'Amount']} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-2">
              {spendingCategories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <div key={category.name} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: category.color }}
                      />
                      <IconComponent className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{category.name}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-medium text-sm">${category.amount}</span>
                      <span className="text-xs text-muted-foreground ml-2">
                        {category.percentage}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-3 border-t">
              <div className="flex justify-between items-center">
                <span className="font-medium">Total Spending</span>
                <span className="font-bold text-lg">${totalSpending}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Monthly Spending Trend */}
      <Card className="banking-card">
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="h-5 w-5 mr-2" />
            Monthly Spending Trend
          </CardTitle>
          <CardDescription>Your spending over the last 5 months</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <XAxis 
                  dataKey="month" 
                  axisLine={false}
                  tickLine={false}
                  className="text-xs"
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  className="text-xs"
                />
                <Tooltip 
                  formatter={(value) => [`$${value}`, 'Spending']}
                  labelStyle={{ color: 'hsl(var(--foreground))' }}
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Bar 
                  dataKey="amount" 
                  fill="hsl(var(--primary))"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 p-3 bg-muted/20 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Average Monthly</span>
              <span className="font-medium">
                ${Math.round(monthlyData.reduce((sum, m) => sum + m.amount, 0) / monthlyData.length)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};