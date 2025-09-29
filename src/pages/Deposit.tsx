import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { 
  DollarSign, 
  CreditCard, 
  Building, 
  Bitcoin,
  RefreshCw
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';
import { useAuth } from '@/contexts/AuthContext';

export const Deposit: React.FC = () => {
  const [depositMethod, setDepositMethod] = useState('bank-transfer');
  const [depositAmount, setDepositAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { fetchUser } = useAuth();

  const API_URL = "http://127.0.0.1:8000/api";

  const quickAmounts = [100, 500, 1000, 10000];

  const depositMethods = [
    {
      id: 'bank-transfer',
      name: 'Bank Transfer',
      description: 'Transfer funds from your bank account',
      icon: Building,
      processingTime: '1-3 business days'
    },
    {
      id: 'paypal',
      name: 'Paypal',
      description: 'Instant transfer via PayPal',
      icon: CreditCard,
      processingTime: 'Instant'
    },
    {
      id: 'bitcoin',
      name: 'Bitcoin',
      description: 'Deposit using cryptocurrency',
      icon: Bitcoin,
      processingTime: '10-30 minutes'
    }
  ];

  const handleQuickAmount = (amount: number) => {
    setDepositAmount(amount.toString());
  };

  const handleDeposit = async () => {
    if (!depositAmount || parseFloat(depositAmount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid deposit amount",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      const res = await axios.post(`${API_URL}/transactions`, {
        type: "credit",
        amount: parseFloat(depositAmount),
        description: `Deposit via ${depositMethod}`,
        merchant: depositMethod,
        category: "deposit"
      });

      toast({
        title: "Deposit Successful",
        description: `Your deposit of $${parseFloat(depositAmount).toLocaleString()} was successful.`,
      });

      // refresh balance
      await fetchUser();

      setDepositAmount('');
    } catch (error: any) {
      toast({
        title: "Deposit Failed",
        description: error.response?.data?.message || "Something went wrong",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Deposit Funds</h1>
        <p className="text-muted-foreground mt-1">
          Choose your preferred deposit method and amount
        </p>
      </div>

      {/* Hero Banner */}
      <Card className="banking-card bg-gradient-to-r from-primary to-primary/80 text-white border-none">
        <CardContent className="p-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
                <RefreshCw className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Fund Your Account</h2>
              <p className="text-white/90">
                Choose your preferred deposit method and amount
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Deposit Method Selection */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="banking-card">
            <CardHeader>
              <CardTitle>Select Deposit Method</CardTitle>
              <CardDescription>
                Choose how you want to fund your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup value={depositMethod} onValueChange={setDepositMethod} className="space-y-4">
                {depositMethods.map((method) => {
                  const IconComponent = method.icon;
                  return (
                    <div key={method.id} className="relative">
                      <RadioGroupItem value={method.id} id={method.id} className="sr-only" />
                      <Label
                        htmlFor={method.id}
                        className={`flex items-center space-x-4 p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                          depositMethod === method.id
                            ? 'border-primary bg-primary/5'
                            : 'border-muted hover:border-primary/30'
                        }`}
                      >
                        <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10">
                          <IconComponent className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold">{method.name}</h3>
                          <p className="text-sm text-muted-foreground">{method.description}</p>
                          <p className="text-xs text-primary">Processing: {method.processingTime}</p>
                        </div>
                      </Label>
                    </div>
                  );
                })}
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Deposit Amount */}
          <Card className="banking-card">
            <CardHeader>
              <CardTitle>Deposit Amount</CardTitle>
              <CardDescription>
                Enter the amount you want to deposit
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Amount (USD)</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0.00"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    className="pl-10 text-lg"
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>

              {/* Quick Amount Buttons */}
              <div className="space-y-2">
                <Label>Quick Amounts</Label>
                <div className="flex flex-wrap gap-2">
                  {quickAmounts.map((amount) => (
                    <Button
                      key={amount}
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickAmount(amount)}
                      className="hover-scale"
                    >
                      ${amount.toLocaleString()}
                    </Button>
                  ))}
                </div>
              </div>

              <Button 
                onClick={handleDeposit} 
                className="w-full btn-gradient"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <DollarSign className="h-4 w-4 mr-2" />
                    Deposit ${depositAmount ? parseFloat(depositAmount).toLocaleString() : '0.00'}
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Deposit Information */}
        <div className="space-y-6">
          <Card className="banking-card">
            <CardHeader>
              <CardTitle>Deposit Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Minimum Deposit:</span>
                  <span className="font-medium">$10.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Maximum Deposit:</span>
                  <span className="font-medium">$50,000.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Processing Fee:</span>
                  <span className="font-medium text-success">Free</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="banking-card border-warning bg-warning/5">
            <CardHeader>
              <CardTitle className="text-warning">Important Notice</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-sm space-y-2 text-muted-foreground">
                <li>• Deposits may take 1-3 business days to process</li>
                <li>• Bank transfers are subject to your bank's policies</li>
                <li>• Cryptocurrency deposits require network confirmations</li>
                <li>• Contact support if you experience any issues</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
