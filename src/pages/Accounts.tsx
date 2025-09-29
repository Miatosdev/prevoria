import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  DollarSign,
  PiggyBank,
  CreditCard,
  Building,
  Plus,
  ArrowUpRight,
  ArrowDownLeft,
  Send,
  Star,
  Users,
  CheckCircle,
  Circle
} from 'lucide-react';

export const Accounts: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [accounts, setAccounts] = useState([
    {
      id: '1',
      name: 'Primary Checking',
      type: 'checking',
      balance: user?.balance || 0,
      account_number: user?.account_number || '****1234',
      currency: 'USD',
      status: 'active',
      isPrimary: true,
      icon: Wallet,
      color: 'from-blue-600 to-blue-800'
    },
    {
      id: '2',
      name: 'High Yield Savings',
      type: 'savings',
      balance: 25430.50,
      account_number: '****5678',
      currency: 'USD',
      status: 'active',
      isPrimary: false,
      icon: PiggyBank,
      color: 'from-green-600 to-green-800'
    },
    {
      id: '3',
      name: 'Business Account',
      type: 'business',
      balance: 8750.25,
      account_number: '****9012',
      currency: 'USD',
      status: 'active',
      isPrimary: false,
      icon: Building,
      color: 'from-purple-600 to-purple-800'
    }
  ]);

  const [beneficiaries] = useState([
    { id: '1', name: 'Sarah Johnson', account_number: '1234567890', bank: 'Chase Bank' },
    { id: '2', name: 'Michael Chen', account_number: '0987654321', bank: 'Bank of America' },
    { id: '3', name: 'Emma Wilson', account_number: '5555666677', bank: 'Wells Fargo' }
  ]);

  const [showAddAccount, setShowAddAccount] = useState(false);
  const [showSendMoney, setShowSendMoney] = useState(false);
  const [showConfirmTransfer, setShowConfirmTransfer] = useState(false);
  const [transferData, setTransferData] = useState<any>(null);

  const setPrimaryAccount = (accountId: string) => {
    setAccounts(prev => prev.map(account => ({
      ...account,
      isPrimary: account.id === accountId
    })));
    toast({
      title: "Primary Account Updated",
      description: "Your primary account has been changed successfully."
    });
  };

  const handleAddAccount = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const newAccount = {
      id: Date.now().toString(),
      name: formData.get('accountName') as string,
      type: formData.get('accountType') as string,
      balance: Math.random() * 10000,
      account_number: `****${Math.floor(1000 + Math.random() * 9000)}`,
      currency: formData.get('currency') as string,
      status: 'active' as const,
      isPrimary: false,
      icon: formData.get('accountType') === 'savings' ? PiggyBank : 
            formData.get('accountType') === 'business' ? Building : Wallet,
      color: 'from-indigo-600 to-indigo-800'
    };

    setAccounts(prev => [...prev, newAccount]);
    setShowAddAccount(false);
    toast({
      title: "Account Added",
      description: `${newAccount.name} has been linked successfully.`
    });
  };

  const handleSendMoney = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const data = {
      recipient: formData.get('recipient'),
      bank: formData.get('bank'),
      amount: formData.get('amount'),
      narration: formData.get('narration'),
      fromAccount: formData.get('fromAccount')
    };

    setTransferData(data);
    setShowSendMoney(false);
    setShowConfirmTransfer(true);
  };

  const confirmTransfer = () => {
    const success = Math.random() > 0.3; // 70% success rate
    
    if (success) {
      toast({
        title: "Transfer Successful",
        description: `$${transferData.amount} sent to ${transferData.recipient} successfully.`
      });
    } else {
      toast({
        title: "Transfer Failed",
        description: "The transfer could not be completed. Please try again.",
        variant: "destructive"
      });
    }
    
    setShowConfirmTransfer(false);
    setTransferData(null);
  };

  const quickTransfers = [
    { name: 'Sarah Johnson', amount: 250, type: 'sent' },
    { name: 'Michael Chen', amount: 125, type: 'received' },
    { name: 'Emma Wilson', amount: 75, type: 'sent' }
  ];

  return (
    <div className="space-y-6 fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Accounts</h1>
          <p className="text-muted-foreground mt-1">
            Overview of all your banking accounts
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-2">
          <Dialog open={showAddAccount} onOpenChange={setShowAddAccount}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add New Account
              </Button>
            </DialogTrigger>
          </Dialog>
          
          <Dialog open={showSendMoney} onOpenChange={setShowSendMoney}>
            <DialogTrigger asChild>
              <Button className="btn-gradient">
                <Send className="h-4 w-4 mr-2" />
                Send Money
              </Button>
            </DialogTrigger>
          </Dialog>
        </div>
      </div>

      {/* Account Cards */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {accounts.map((account) => {
          const Icon = account.icon;
          return (
            <Card key={account.id} className="banking-card-elevated overflow-hidden">
              <div className={`bg-gradient-to-br ${account.color} p-6 text-white relative`}>
                {account.isPrimary && (
                  <Star className="absolute top-4 right-4 h-5 w-5 text-yellow-300 fill-yellow-300" />
                )}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <p className="text-white/80 text-sm">{account.name}</p>
                      <Badge 
                        variant={account.status === 'active' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {account.status}
                      </Badge>
                    </div>
                    <p className="text-3xl font-bold">{account.currency} ${account.balance.toLocaleString()}</p>
                    <p className="text-white/80 text-sm mt-1">{account.account_number}</p>
                  </div>
                  <Icon className="h-12 w-12 text-white/30" />
                </div>
              </div>
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => setShowSendMoney(true)}
                    >
                      <Send className="h-4 w-4 mr-1" />
                      Send
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <ArrowDownLeft className="h-4 w-4 mr-1" />
                      Request
                    </Button>
                  </div>
                  
                  {!account.isPrimary && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full text-xs"
                      onClick={() => setPrimaryAccount(account.id)}
                    >
                      <Star className="h-3 w-3 mr-1" />
                      Set as Primary
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Account Summary */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Total Balance Overview */}
        <Card className="banking-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <DollarSign className="h-5 w-5 mr-2" />
              Total Balance
            </CardTitle>
            <CardDescription>Combined balance across all accounts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <p className="balance-text">${(accounts.reduce((sum, acc) => sum + acc.balance, 0)).toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Total across {accounts.length} accounts</p>
              </div>
              
              <div className="space-y-3">
                {accounts.map((account) => (
                  <div key={account.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${account.color} flex items-center justify-center`}>
                        <account.icon className="h-4 w-4 text-white" />
                      </div>
                      <span className="font-medium text-sm">{account.name}</span>
                    </div>
                    <span className="font-semibold">${account.balance.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="banking-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              Recent Activity
            </CardTitle>
            <CardDescription>Latest transfers and transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {quickTransfers.map((transfer, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      transfer.type === 'sent' ? 'bg-destructive/20' : 'bg-success/20'
                    }`}>
                      {transfer.type === 'sent' ? (
                        <ArrowUpRight className="h-4 w-4 text-destructive" />
                      ) : (
                        <ArrowDownLeft className="h-4 w-4 text-success" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{transfer.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {transfer.type === 'sent' ? 'Money sent' : 'Money received'}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${
                      transfer.type === 'sent' ? 'text-destructive' : 'text-success'
                    }`}>
                      {transfer.type === 'sent' ? '-' : '+'}${transfer.amount}
                    </p>
                    <p className="text-xs text-muted-foreground">Today</p>
                  </div>
                </div>
              ))}
              
              <Button variant="outline" className="w-full">
                View All Activity
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Account Services */}
      <Card className="banking-card">
        <CardHeader>
          <CardTitle>Account Services</CardTitle>
          <CardDescription>Manage your banking needs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
              <CreditCard className="h-8 w-8 text-primary" />
              <div className="text-center">
                <p className="font-medium">Order Debit Card</p>
                <p className="text-xs text-muted-foreground">Get a new physical card</p>
              </div>
            </Button>
            
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
              <Building className="h-8 w-8 text-primary" />
              <div className="text-center">
                <p className="font-medium">Account Statements</p>
                <p className="text-xs text-muted-foreground">Download monthly statements</p>
              </div>
            </Button>
            
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
              <PiggyBank className="h-8 w-8 text-primary" />
              <div className="text-center">
                <p className="font-medium">Set Savings Goal</p>
                <p className="text-xs text-muted-foreground">Create automatic savings</p>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Beneficiaries */}
      <Card className="banking-card">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="h-5 w-5 mr-2" />
            Saved Beneficiaries
          </CardTitle>
          <CardDescription>Quick access to your frequent recipients</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {beneficiaries.map((beneficiary) => (
              <div key={beneficiary.id} className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{beneficiary.name}</p>
                    <p className="text-sm text-muted-foreground">{beneficiary.account_number}</p>
                    <p className="text-xs text-muted-foreground">{beneficiary.bank}</p>
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => setShowSendMoney(true)}
                  >
                    <Send className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Add Account Modal */}
      <Dialog open={showAddAccount} onOpenChange={setShowAddAccount}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Account</DialogTitle>
            <DialogDescription>
              Link a new bank account or wallet to your profile.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleAddAccount} className="space-y-4">
            <div>
              <Label htmlFor="accountName">Account Name</Label>
              <Input id="accountName" name="accountName" placeholder="My Savings Account" required />
            </div>
            
            <div>
              <Label htmlFor="accountType">Account Type</Label>
              <Select name="accountType" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select account type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="checking">Checking Account</SelectItem>
                  <SelectItem value="savings">Savings Account</SelectItem>
                  <SelectItem value="business">Business Account</SelectItem>
                  <SelectItem value="wallet">Digital Wallet</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="currency">Currency</Label>
              <Select name="currency" defaultValue="USD" required>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD - US Dollar</SelectItem>
                  <SelectItem value="EUR">EUR - Euro</SelectItem>
                  <SelectItem value="GBP">GBP - British Pound</SelectItem>
                  <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={() => setShowAddAccount(false)} className="flex-1">
                Cancel
              </Button>
              <Button type="submit" className="flex-1">
                Add Account
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Send Money Modal */}
      <Dialog open={showSendMoney} onOpenChange={setShowSendMoney}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send Money</DialogTitle>
            <DialogDescription>
              Transfer money to another account or beneficiary.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSendMoney} className="space-y-4">
            <div>
              <Label htmlFor="fromAccount">From Account</Label>
              <Select name="fromAccount" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select source account" />
                </SelectTrigger>
                <SelectContent>
                  {accounts.map((account) => (
                    <SelectItem key={account.id} value={account.id}>
                      {account.name} - ${account.balance.toLocaleString()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="recipient">Recipient Account Number</Label>
              <Input id="recipient" name="recipient" placeholder="Enter account number" required />
            </div>
            
            <div>
              <Label htmlFor="bank">Recipient Bank</Label>
              <Select name="bank" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select bank" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="chase">Chase Bank</SelectItem>
                  <SelectItem value="boa">Bank of America</SelectItem>
                  <SelectItem value="wells">Wells Fargo</SelectItem>
                  <SelectItem value="citi">Citibank</SelectItem>
                  <SelectItem value="same">Everstone Finance</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="amount">Amount</Label>
              <Input id="amount" name="amount" type="number" step="0.01" placeholder="0.00" required />
            </div>
            
            <div>
              <Label htmlFor="narration">Narration (Optional)</Label>
              <Input id="narration" name="narration" placeholder="Payment description" />
            </div>
            
            <div className="flex space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={() => setShowSendMoney(false)} className="flex-1">
                Cancel
              </Button>
              <Button type="submit" className="flex-1">
                Continue
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Transfer Confirmation Modal */}
      <Dialog open={showConfirmTransfer} onOpenChange={setShowConfirmTransfer}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Transfer</DialogTitle>
            <DialogDescription>
              Please review the transfer details before confirming.
            </DialogDescription>
          </DialogHeader>
          
          {transferData && (
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Amount:</span>
                  <span className="font-semibold">${transferData.amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Recipient:</span>
                  <span>{transferData.recipient}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Bank:</span>
                  <span>{transferData.bank}</span>
                </div>
                {transferData.narration && (
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Narration:</span>
                    <span>{transferData.narration}</span>
                  </div>
                )}
              </div>
              
              <div className="flex space-x-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowConfirmTransfer(false)} 
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button onClick={confirmTransfer} className="flex-1">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Confirm Transfer
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};