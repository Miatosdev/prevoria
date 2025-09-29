import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { 
  CreditCard, 
  ArrowLeft,
  Sliders
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const VirtualCards: React.FC = () => {
  const [cardType, setCardType] = useState('visa');
  const [cardLevel, setCardLevel] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [dailyLimit, setDailyLimit] = useState('1000');
  const [cardholderName, setCardholderName] = useState('Bradly');
  const { toast } = useToast();

  const cardTypes = [
    {
      id: 'visa',
      name: 'Visa',
      description: 'Accepted worldwide, suitable for most online purchases',
      logo: 'VISA'
    },
    {
      id: 'mastercard',
      name: 'Mastercard',
      description: 'Global acceptance with enhanced security features',
      logo: 'MASTERCARD'
    },
    {
      id: 'amex',
      name: 'American Express',
      description: 'Premium benefits and exclusive rewards program',
      logo: 'AMERICAN EXPRESS'
    }
  ];

  const handleApplyCard = () => {
    if (!cardLevel) {
      toast({
        title: "Missing Information",
        description: "Please select a card level",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Application Submitted",
      description: `Your ${cardType} card application has been submitted successfully`,
    });

    console.log('Card application:', { cardType, cardLevel, currency, dailyLimit, cardholderName });
  };

  return (
    <div className="space-y-6 fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Apply for Virtual Card</h1>
          <p className="text-muted-foreground mt-1">
            Get instant access to a virtual card for online payments and subscriptions
          </p>
        </div>
        <Button variant="outline" className="flex items-center">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Cards
        </Button>
      </div>

      {/* Hero Banner */}
      <Card className="banking-card bg-gradient-to-r from-primary to-primary/80 text-white border-none">
        <CardContent className="p-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Apply for a Virtual Card</h2>
              <p className="text-white/90">
                Get instant access to a virtual card for online payments and subscriptions
              </p>
            </div>
            <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center">
              <CreditCard className="h-8 w-8 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Card Application Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Card Details */}
          <Card className="banking-card">
            <CardHeader>
              <CardTitle>Card Details</CardTitle>
              <CardDescription>
                Select your preferred card type and level
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Card Type */}
                <div className="space-y-4">
                  <Label className="text-base font-semibold">Card Type</Label>
                  <RadioGroup value={cardType} onValueChange={setCardType} className="space-y-3">
                    {cardTypes.map((type) => (
                      <div key={type.id} className="relative">
                        <RadioGroupItem value={type.id} id={type.id} className="sr-only" />
                        <Label
                          htmlFor={type.id}
                          className={`flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                            cardType === type.id
                              ? 'border-primary bg-primary/5'
                              : 'border-muted hover:border-primary/30'
                          }`}
                        >
                          <div>
                            <div className="flex items-center space-x-2 mb-1">
                              <RadioGroupItem value={type.id} className="w-4 h-4" />
                              <h3 className="font-semibold">{type.name}</h3>
                            </div>
                            <p className="text-xs text-muted-foreground">{type.description}</p>
                          </div>
                          <div className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded">
                            {type.logo}
                          </div>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                {/* Card Level */}
                <div className="space-y-2">
                  <Label htmlFor="cardLevel" className="text-base font-semibold">
                    Card Level <span className="text-destructive">*</span>
                  </Label>
                  <Select value={cardLevel} onValueChange={setCardLevel}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a card level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="premium">Premium</SelectItem>
                      <SelectItem value="platinum">Platinum</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Different levels offer varied spending limits and features
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Currency */}
                <div className="space-y-2">
                  <Label htmlFor="currency" className="text-base font-semibold">Currency</Label>
                  <Select value={currency} onValueChange={setCurrency}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD - US Dollar</SelectItem>
                      <SelectItem value="EUR">EUR - Euro</SelectItem>
                      <SelectItem value="GBP">GBP - British Pound</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Daily Spending Limit */}
                <div className="space-y-2">
                  <Label htmlFor="dailyLimit" className="text-base font-semibold">Daily Spending Limit</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
                    <Input
                      id="dailyLimit"
                      type="number"
                      value={dailyLimit}
                      onChange={(e) => setDailyLimit(e.target.value)}
                      className="pl-8"
                      min="100"
                      max="10000"
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-muted-foreground">USD</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Limits: $1,000.00 - $10,000.00
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Billing Information */}
          <Card className="banking-card">
            <CardHeader>
              <CardTitle>Billing Information</CardTitle>
              <CardDescription>
                Cardholder details for the virtual card
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cardholderName" className="text-base font-semibold">Cardholder Name</Label>
                  <Input
                    id="cardholderName"
                    value={cardholderName}
                    onChange={(e) => setCardholderName(e.target.value)}
                    placeholder="Full name as it appears on your account"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Apply Button */}
          <Button onClick={handleApplyCard} className="w-full btn-gradient" size="lg">
            <CreditCard className="h-4 w-4 mr-2" />
            Apply for Virtual Card
          </Button>
        </div>

        {/* Application Summary */}
        <div className="space-y-6">
          <Card className="banking-card">
            <CardHeader>
              <CardTitle>Application Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Card Type:</span>
                  <span className="font-medium capitalize">{cardType}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Card Level:</span>
                  <span className="font-medium capitalize">{cardLevel || 'Not selected'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Currency:</span>
                  <span className="font-medium">{currency}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Daily Limit:</span>
                  <span className="font-medium">${parseInt(dailyLimit).toLocaleString()}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between font-semibold">
                    <span>Application Fee:</span>
                    <span className="text-success">Free</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="banking-card border-primary bg-primary/5">
            <CardHeader>
              <CardTitle className="text-primary">Card Benefits</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-sm space-y-2 text-muted-foreground">
                <li>• Instant card creation</li>
                <li>• Secure online payments</li>
                <li>• Real-time transaction notifications</li>
                <li>• Spending controls and limits</li>
                <li>• Virtual card management</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};