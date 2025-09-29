import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  DollarSign, 
  Send, 
  Wallet,
  ArrowRight,
  Check,
  Building2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const LocalTransfer: React.FC = () => {
  const [transferAmount, setTransferAmount] = useState('');
  const [recipientBank, setRecipientBank] = useState('');
  const [account_number, setaccount_number] = useState('');
  const [routingNumber, setRoutingNumber] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const availableBalance = 200000;
  const quickAmounts = [100, 500, 1000];

  const handleQuickAmount = (amount: number) => {
    setTransferAmount(amount.toString());
  };

  const handleAllAmount = () => {
    setTransferAmount(availableBalance.toString());
  };

  const handleTransfer = async () => {
    if (!transferAmount || parseFloat(transferAmount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid transfer amount",
        variant: "destructive"
      });
      return;
    }

    if (parseFloat(transferAmount) > availableBalance) {
      toast({
        title: "Insufficient Funds",
        description: "Transfer amount exceeds available balance",
        variant: "destructive"
      });
      return;
    }

    if (!recipientBank || !account_number || !routingNumber || !recipientName) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Transfer Initiated",
        description: `Your transfer of $${parseFloat(transferAmount).toLocaleString()} has been initiated`,
      });
      console.log(`Local transfer initiated: $${transferAmount} to ${recipientName}`);
    }, 2000);
  };

  return (
    <div className="space-y-6 fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Local Transfer</h1>
        <p className="text-muted-foreground mt-1">
          Send money to any local bank account securely
        </p>
      </div>

      {/* Hero Banner */}
      <Card className="banking-card bg-gradient-to-r from-primary to-primary/80 text-white border-none">
        <CardContent className="p-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
                <Send className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Local Bank Transfer</h2>
              <p className="text-white/90">
                Send money to any local bank account securely
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Transfer Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Available Balance */}
          <Card className="banking-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Wallet className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Available Balance</p>
                    <p className="text-2xl font-bold">${availableBalance.toLocaleString()}.00</p>
                  </div>
                </div>
                <div className="bg-success/10 text-success px-3 py-1 rounded-full text-sm font-medium">
                  Available
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Transfer Amount */}
          <Card className="banking-card">
            <CardHeader>
              <CardTitle>Transfer Amount</CardTitle>
              <CardDescription>
                Enter the amount you want to transfer
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
                    value={transferAmount}
                    onChange={(e) => setTransferAmount(e.target.value)}
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
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleAllAmount}
                    className="hover-scale"
                  >
                    All
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recipient Information */}
          <Card className="banking-card">
            <CardHeader>
              <CardTitle>Recipient Information</CardTitle>
              <CardDescription>
                Enter the recipient's banking details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="recipientName">Recipient Name *</Label>
                  <Input
                    id="recipientName"
                    placeholder="Full name"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="recipientBank">Bank Name *</Label>
                  <Select value={recipientBank} onValueChange={setRecipientBank}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select bank" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="chase">Chase Bank</SelectItem>
                      <SelectItem value="boa">Bank of America</SelectItem>
                      <SelectItem value="wells">Wells Fargo</SelectItem>
                      <SelectItem value="citi">Citibank</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="account_number">Account Number *</Label>
                  <Input
                    id="account_number"
                    placeholder="Account number"
                    value={account_number}
                    onChange={(e) => setaccount_number(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="routingNumber">Routing Number *</Label>
                  <Input
                    id="routingNumber"
                    placeholder="Routing number"
                    value={routingNumber}
                    onChange={(e) => setRoutingNumber(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Transfer Button */}
          <Button 
            onClick={handleTransfer} 
            className="w-full btn-gradient"
            disabled={isLoading}
            size="lg"
          >
            {isLoading ? (
              <>
                <ArrowRight className="h-4 w-4 mr-2 animate-pulse" />
                Processing Transfer...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Transfer ${transferAmount ? parseFloat(transferAmount).toLocaleString() : '0.00'}
              </>
            )}
          </Button>
        </div>

        {/* Transfer Summary */}
        <div className="space-y-6">
          <Card className="banking-card">
            <CardHeader>
              <CardTitle>Transfer Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Transfer Amount:</span>
                  <span className="font-medium">
                    ${transferAmount ? parseFloat(transferAmount).toLocaleString() : '0.00'}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Transfer Fee:</span>
                  <span className="font-medium text-success">Free</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between font-semibold">
                    <span>Total Amount:</span>
                    <span>${transferAmount ? parseFloat(transferAmount).toLocaleString() : '0.00'}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="banking-card border-primary bg-primary/5">
            <CardHeader>
              <CardTitle className="text-primary flex items-center">
                <Check className="h-5 w-5 mr-2" />
                Secure Transfer
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-sm space-y-2 text-muted-foreground">
                <li>• All transfers are encrypted and secure</li>
                <li>• Transfers typically complete within 24 hours</li>
                <li>• No hidden fees or charges</li>
                <li>• Real-time transfer notifications</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="banking-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building2 className="h-5 w-5 mr-2" />
                Processing Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Same Bank:</span>
                  <span className="font-medium">Instant</span>
                </div>
                <div className="flex justify-between">
                  <span>Other Banks:</span>
                  <span className="font-medium">1-2 business days</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};