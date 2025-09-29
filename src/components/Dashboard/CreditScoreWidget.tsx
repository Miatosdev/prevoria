import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Shield, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';

export const CreditScoreWidget: React.FC = () => {
  const creditScore = 742;
  const maxScore = 850;
  const scorePercentage = (creditScore / maxScore) * 100;
  
  const getScoreRating = (score: number) => {
    if (score >= 800) return { rating: 'Excellent', color: 'text-success', bg: 'bg-success/10' };
    if (score >= 740) return { rating: 'Very Good', color: 'text-success', bg: 'bg-success/10' };
    if (score >= 670) return { rating: 'Good', color: 'text-warning', bg: 'bg-warning/10' };
    if (score >= 580) return { rating: 'Fair', color: 'text-warning', bg: 'bg-warning/10' };
    return { rating: 'Poor', color: 'text-destructive', bg: 'bg-destructive/10' };
  };

  const { rating, color, bg } = getScoreRating(creditScore);

  const improvements = [
    { text: 'Pay down credit card balances', impact: '+15 points', completed: false },
    { text: 'Keep old accounts open', impact: '+8 points', completed: true },
    { text: 'Avoid new credit inquiries', impact: '+5 points', completed: true }
  ];

  return (
    <Card className="banking-card">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center">
            <Shield className="h-5 w-5 mr-2" />
            Credit Score
          </span>
          <Button variant="outline" size="sm">
            View Report
          </Button>
        </CardTitle>
        <CardDescription>Your credit score and improvement tips</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Credit Score Display */}
          <div className="text-center">
            <div className="relative">
              <div className="w-32 h-32 mx-auto mb-4">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="stroke-muted"
                    strokeWidth="3"
                    fill="none"
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="stroke-primary"
                    strokeWidth="3"
                    strokeDasharray={`${scorePercentage}, 100`}
                    strokeLinecap="round"
                    fill="none"
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{creditScore}</div>
                    <div className="text-xs text-muted-foreground">of {maxScore}</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${bg} ${color}`}>
              {rating}
            </div>
          </div>

          {/* Score Change */}
          <div className="flex items-center justify-center space-x-2">
            <TrendingUp className="h-4 w-4 text-success" />
            <span className="text-success font-medium">+12 points</span>
            <span className="text-muted-foreground text-sm">this month</span>
          </div>

          {/* Improvement Tips */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm">Ways to improve your score:</h4>
            <div className="space-y-2">
              {improvements.map((item, index) => (
                <div key={index} className="flex items-start space-x-3 p-2 rounded-lg bg-muted/20">
                  {item.completed ? (
                    <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-warning mt-0.5 flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <p className={`text-sm ${item.completed ? 'line-through text-muted-foreground' : ''}`}>
                      {item.text}
                    </p>
                    <p className="text-xs text-success font-medium">{item.impact}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress to Excellent (800+)</span>
              <span>{800 - creditScore} points to go</span>
            </div>
            <Progress value={((creditScore - 300) / (800 - 300)) * 100} className="h-2" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};