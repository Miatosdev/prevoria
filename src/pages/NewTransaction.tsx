import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Send, User, Building, Repeat, Globe, RefreshCw, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';

export const NewTransaction: React.FC = () => {
  const navigate = useNavigate();
  const { fetchUser } = useAuth();
  const { toast } = useToast();

  const [transactionType, setTransactionType] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    recipient: '',
    amount: '',
    description: '',
    category: '',
    account_number: '',
    routingNumber: ''
  });

  const API_URL = "http://127.0.0.1:8000/api";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.amount) return;

    setLoading(true);

    try {
      const res = await axios.post(`${API_URL}/transactions`, {
        type: "debit",
        amount: parseFloat(formData.amount),
        description: formData.description || transactionType.replace('-', ' '),
        merchant: formData.recipient,
        category: formData.category || "transfer"
      });

      toast({
        title: "Transaction Successful",
        description: `Your ${transactionType.replace('-', ' ')} has been processed.`,
      });

      setFormData({
        recipient: '',
        amount: '',
        description: '',
        category: '',
        account_number: '',
        routingNumber: ''
      });
      await fetchUser();
      navigate('/dashboard');
    } catch (error: any) {
      toast({
        title: "Transaction Failed",
        description: error.response?.data?.message || "Could not complete the transaction.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const transactionTypes = [
    { id: 'send-money', title: 'Send Money', icon: Send, description: 'Transfer to another person' },
    { id: 'bank-transfer', title: 'Bank Transfer', icon: Building, description: 'Transfer to another bank' },
    { id: 'recurring-payment', title: 'Recurring Payment', icon: Repeat, description: 'Set up automatic payments' },
    { id: 'international', title: 'International Transfer', icon: Globe, description: 'Send money abroad' }
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="icon" onClick={() => navigate('/dashboard')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">New Transaction</h1>
          <p className="text-muted-foreground">Send money, pay bills, or transfer funds</p>
        </div>
      </div>

      {!transactionType ? (
        <div className="grid md:grid-cols-2 gap-6">
          {transactionTypes.map((type) => {
            const Icon = type.icon;
            return (
              <Card 
                key={type.id} 
                className="banking-card cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105"
                onClick={() => setTransactionType(type.id)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{type.title}</h3>
                      <p className="text-muted-foreground text-sm">{type.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card className="banking-card-elevated">
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="h-5 w-5 mr-2" />
              {transactionTypes.find(t => t.id === transactionType)?.title}
            </CardTitle>
            <CardDescription>
              Fill in the details for your transaction
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="recipient">Recipient Name</Label>
                  <Input
                    id="recipient"
                    placeholder="Enter recipient name"
                    value={formData.recipient}
                    onChange={(e) => setFormData({...formData, recipient: e.target.value})}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amount">Amount ($)</Label>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={formData.amount}
                    onChange={(e) => setFormData({...formData, amount: e.target.value})}
                    required
                  />
                </div>

                {transactionType === 'bank-transfer' && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="account_number">Account Number</Label>
                      <Input
                        id="account_number"
                        placeholder="Enter account number"
                        value={formData.account_number}
                        onChange={(e) => setFormData({...formData, account_number: e.target.value})}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="routingNumber">Routing Number</Label>
                      <Input
                        id="routingNumber"
                        placeholder="Enter routing number"
                        value={formData.routingNumber}
                        onChange={(e) => setFormData({...formData, routingNumber: e.target.value})}
                        required
                      />
                    </div>
                  </>
                )}

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="personal">Personal</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="bills">Bills & Utilities</SelectItem>
                      <SelectItem value="shopping">Shopping</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  placeholder="Add a note for this transaction"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={3}
                />
              </div>

              <div className="flex items-center justify-between pt-6 border-t">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setTransactionType('')}
                >
                  Back
                </Button>
                <Button 
                  type="submit" 
                  className="btn-gradient" 
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Send Transaction
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
