import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Globe, 
  Bitcoin, 
  CreditCard,
  Zap,
  DollarSign,
  MoreHorizontal,
  Shield,
  ArrowRight
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const InternationalTransfer: React.FC = () => {
  const [selectedMethod, setSelectedMethod] = useState('');
  const { toast } = useToast();

  const transferMethods = [
    {
      id: 'wire-transfer',
      name: 'Wire Transfer',
      description: 'Transfer funds directly to international bank accounts',
      icon: Globe,
      fee: '$15-25',
      time: '1-5 business days',
      color: 'bg-blue-500'
    },
    {
      id: 'cryptocurrency',
      name: 'Cryptocurrency',
      description: 'Send funds to your cryptocurrency wallet',
      icon: Bitcoin,
      fee: 'Network fees apply',
      time: '10-30 minutes',
      color: 'bg-orange-500'
    },
    {
      id: 'paypal',
      name: 'PayPal',
      description: 'Transfer funds to your PayPal account',
      icon: CreditCard,
      fee: '2.9% + $0.30',
      time: 'Instant',
      color: 'bg-blue-600'
    },
    {
      id: 'wise-transfer',
      name: 'Wise Transfer',
      description: 'Transfer with lower fees using Wise',
      icon: Zap,
      fee: '0.5-2%',
      time: 'Few hours',
      color: 'bg-green-500'
    },
    {
      id: 'cash-app',
      name: 'Cash App',
      description: 'Quick transfers to your Cash App account',
      icon: DollarSign,
      fee: '1.5%',
      time: 'Instant',
      color: 'bg-green-600'
    },
    {
      id: 'more-options',
      name: 'More Options',
      description: 'Zelle, Venmo, Revolut, and more',
      icon: MoreHorizontal,
      fee: 'Varies',
      time: 'Varies',
      color: 'bg-gray-500'
    }
  ];

  const handleMethodSelect = (methodId: string) => {
    setSelectedMethod(methodId);
    const method = transferMethods.find(m => m.id === methodId);
    
    toast({
      title: "Transfer Method Selected",
      description: `You selected ${method?.name}. Redirecting to transfer form...`,
    });
    
    console.log(`Selected transfer method: ${method?.name}`);
    
    // Simulate navigation to specific transfer form
    setTimeout(() => {
      toast({
        title: "Feature Coming Soon",
        description: "This transfer method will be available soon",
      });
    }, 1500);
  };

  return (
    <div className="space-y-6 fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">International Transfer</h1>
        <p className="text-muted-foreground mt-1">
          Send money globally with secure and fast transfer options
        </p>
      </div>

      {/* Transfer Methods Grid */}
      <div className="space-y-6">
        <Card className="banking-card">
          <CardHeader>
            <CardTitle>Select Transfer Method</CardTitle>
            <CardDescription>
              Choose your preferred method for international money transfer
            </CardDescription>
          </CardHeader>
        </Card>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {transferMethods.map((method) => {
            const IconComponent = method.icon;
            return (
              <Card 
                key={method.id} 
                className={`banking-card cursor-pointer transition-all duration-200 hover:shadow-lg hover-scale ${
                  selectedMethod === method.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => handleMethodSelect(method.id)}
              >
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* Icon and Name */}
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 ${method.color} rounded-lg flex items-center justify-center`}>
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{method.name}</h3>
                      </div>
                    </div>
                    
                    {/* Description */}
                    <p className="text-sm text-muted-foreground">
                      {method.description}
                    </p>
                    
                    {/* Details */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Fee:</span>
                        <span className="font-medium">{method.fee}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Time:</span>
                        <span className="font-medium">{method.time}</span>
                      </div>
                    </div>
                    
                    {/* Action Button */}
                    <Button 
                      className="w-full btn-gradient"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMethodSelect(method.id);
                      }}
                    >
                      Select Method
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Security Notice */}
      <Card className="banking-card border-primary bg-primary/5">
        <CardContent className="p-6">
          <div className="flex items-start space-x-3">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-primary mb-2">Secure Transaction</h3>
              <p className="text-sm text-muted-foreground">
                All transfers are encrypted and processed securely. Never share your PIN with anyone.
                We use industry-standard security measures to protect your financial information.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Additional Information */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="banking-card">
          <CardHeader>
            <CardTitle>Transfer Limits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Daily Limit:</span>
                <span className="font-medium">$50,000</span>
              </div>
              <div className="flex justify-between">
                <span>Monthly Limit:</span>
                <span className="font-medium">$250,000</span>
              </div>
              <div className="flex justify-between">
                <span>Minimum Transfer:</span>
                <span className="font-medium">$10</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="banking-card">
          <CardHeader>
            <CardTitle>Need Help?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Our support team is available 24/7 to help with your international transfers.
            </p>
            <div className="space-y-2">
              <Button variant="outline" className="w-full">
                Contact Support
              </Button>
              <Button variant="outline" className="w-full">
                View Transfer Guide
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};