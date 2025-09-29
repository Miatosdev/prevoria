import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, DollarSign, BarChart3, Plus } from 'lucide-react';

interface Investment {
  id: string;
  name: string;
  symbol: string;
  currentPrice: number;
  change: number;
  changePercent: number;
  shares: number;
  totalValue: number;
}

export const InvestmentPortfolio: React.FC = () => {
  const investments: Investment[] = [
    {
      id: '1',
      name: 'Apple Inc.',
      symbol: 'AAPL',
      currentPrice: 175.30,
      change: 2.15,
      changePercent: 1.24,
      shares: 10,
      totalValue: 1753.00
    },
    {
      id: '2',
      name: 'Microsoft Corporation',
      symbol: 'MSFT',
      currentPrice: 342.75,
      change: -5.20,
      changePercent: -1.49,
      shares: 5,
      totalValue: 1713.75
    },
    {
      id: '3',
      name: 'Tesla Inc.',
      symbol: 'TSLA',
      currentPrice: 248.50,
      change: 12.30,
      changePercent: 5.20,
      shares: 8,
      totalValue: 1988.00
    }
  ];

  const totalPortfolioValue = investments.reduce((sum, inv) => sum + inv.totalValue, 0);
  const totalChange = investments.reduce((sum, inv) => sum + (inv.change * inv.shares), 0);
  const totalChangePercent = (totalChange / (totalPortfolioValue - totalChange)) * 100;

  return (
    <Card className="banking-card">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center">
            <BarChart3 className="h-5 w-5 mr-2" />
            Investment Portfolio
          </span>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </CardTitle>
        <CardDescription>Your stock and investment performance</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Portfolio Summary */}
          <div className="p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Portfolio Value</p>
                <p className="text-2xl font-bold">${totalPortfolioValue.toLocaleString()}</p>
              </div>
              <div className="text-right">
                <div className={`flex items-center ${totalChange >= 0 ? 'text-success' : 'text-destructive'}`}>
                  {totalChange >= 0 ? (
                    <TrendingUp className="h-4 w-4 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 mr-1" />
                  )}
                  <span className="font-medium">
                    {totalChange >= 0 ? '+' : ''}${totalChange.toFixed(2)}
                  </span>
                </div>
                <p className={`text-sm ${totalChangePercent >= 0 ? 'text-success' : 'text-destructive'}`}>
                  {totalChangePercent >= 0 ? '+' : ''}{totalChangePercent.toFixed(2)}%
                </p>
              </div>
            </div>
          </div>

          {/* Individual Investments */}
          <div className="space-y-3">
            {investments.map((investment) => (
              <div key={investment.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/20 hover:bg-muted/40 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                    <DollarSign className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{investment.name}</p>
                    <p className="text-xs text-muted-foreground">{investment.symbol} • {investment.shares} shares</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-sm">${investment.totalValue.toLocaleString()}</p>
                  <div className={`flex items-center text-xs ${investment.change >= 0 ? 'text-success' : 'text-destructive'}`}>
                    {investment.change >= 0 ? (
                      <TrendingUp className="h-3 w-3 mr-1" />
                    ) : (
                      <TrendingDown className="h-3 w-3 mr-1" />
                    )}
                    {investment.change >= 0 ? '+' : ''}{investment.changePercent.toFixed(2)}%
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Button className="w-full btn-gradient">
            <Plus className="h-4 w-4 mr-2" />
            Invest More
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};