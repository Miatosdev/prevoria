import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Banknote, 
  Plus, 
  Clock, 
  CheckCircle, 
  XCircle,
  Calculator,
  FileText,
  Calendar
} from 'lucide-react';
import { mockLoanApplications } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

export const Loans: React.FC = () => {
  const [loans, setLoans] = useState(mockLoanApplications);
  const [isApplyDialogOpen, setIsApplyDialogOpen] = useState(false);
  const [loanData, setLoanData] = useState({
    type: 'personal',
    amount: '',
    duration: '12',
    purpose: ''
  });
  const { toast } = useToast();

  const handleApplyLoan = () => {
    if (!loanData.amount || !loanData.purpose) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const amount = parseFloat(loanData.amount);
    if (amount < 1000 || amount > 100000) {
      toast({
        title: "Error",
        description: "Loan amount must be between $1,000 and $100,000",
        variant: "destructive"
      });
      return;
    }

    // Random status for demo
    const statuses = ['pending', 'approved', 'rejected'];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

    const newLoan = {
      id: Date.now().toString(),
      type: loanData.type as 'personal' | 'auto' | 'home' | 'business',
      amount: amount,
      duration: parseInt(loanData.duration),
      purpose: loanData.purpose,
      status: randomStatus as 'pending' | 'approved' | 'rejected',
      appliedDate: new Date(),
      ...(randomStatus === 'approved' && {
        interestRate: 7.5 + Math.random() * 5, // Random rate between 7.5% and 12.5%
        monthlyPayment: (amount * (1 + (0.08 * parseInt(loanData.duration) / 12))) / parseInt(loanData.duration)
      })
    };

    setLoans([newLoan, ...loans]);
    setIsApplyDialogOpen(false);
    setLoanData({ type: 'personal', amount: '', duration: '12', purpose: '' });
    
    console.log('New loan application submitted:', newLoan);
    
    toast({
      title: "Loan Application Submitted",
      description: `Your ${loanData.type} loan application has been submitted for review`,
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-5 w-5 text-success" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-warning" />;
      case 'rejected':
        return <XCircle className="h-5 w-5 text-destructive" />;
      default:
        return <Clock className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <span className="status-success">Approved</span>;
      case 'pending':
        return <span className="status-warning">Pending</span>;
      case 'rejected':
        return <span className="status-error">Rejected</span>;
      default:
        return <span className="status-warning">Pending</span>;
    }
  };

  const calculateMonthlyPayment = (amount: number, duration: number, rate: number = 8.5) => {
    const monthlyRate = rate / 100 / 12;
    const numPayments = duration;
    return (amount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
  };

  return (
    <div className="space-y-6 fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Loans</h1>
          <p className="text-muted-foreground mt-1">
            Apply for loans and manage your existing applications
          </p>
        </div>
        <Dialog open={isApplyDialogOpen} onOpenChange={setIsApplyDialogOpen}>
          <DialogTrigger asChild>
            <Button className="btn-gradient mt-4 md:mt-0">
              <Plus className="h-4 w-4 mr-2" />
              Apply for Loan
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Apply for a Loan</DialogTitle>
              <DialogDescription>
                Fill out the application form to apply for a loan
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="loanType">Loan Type</Label>
                <Select value={loanData.type} onValueChange={(value) => setLoanData({...loanData, type: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="personal">Personal Loan</SelectItem>
                    <SelectItem value="auto">Auto Loan</SelectItem>
                    <SelectItem value="home">Home Loan</SelectItem>
                    <SelectItem value="business">Business Loan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="amount">Loan Amount ($)</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="10000"
                  value={loanData.amount}
                  onChange={(e) => setLoanData({...loanData, amount: e.target.value})}
                />
                <p className="text-xs text-muted-foreground">Minimum: $1,000 • Maximum: $100,000</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="duration">Duration (months)</Label>
                <Select value={loanData.duration} onValueChange={(value) => setLoanData({...loanData, duration: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="12">12 months</SelectItem>
                    <SelectItem value="24">24 months</SelectItem>
                    <SelectItem value="36">36 months</SelectItem>
                    <SelectItem value="48">48 months</SelectItem>
                    <SelectItem value="60">60 months</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="purpose">Purpose</Label>
                <Textarea
                  id="purpose"
                  placeholder="Describe the purpose of this loan..."
                  value={loanData.purpose}
                  onChange={(e) => setLoanData({...loanData, purpose: e.target.value})}
                  rows={3}
                />
              </div>
              
              {/* Loan Calculator Preview */}
              {loanData.amount && (
                <div className="p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Calculator className="h-4 w-4 mr-2" />
                    <span className="font-medium text-sm">Estimated Monthly Payment</span>
                  </div>
                  <p className="text-2xl font-bold text-primary">
                    ${calculateMonthlyPayment(parseFloat(loanData.amount), parseInt(loanData.duration)).toFixed(2)}
                  </p>
                  <p className="text-xs text-muted-foreground">Based on 8.5% APR (subject to approval)</p>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsApplyDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleApplyLoan} className="btn-gradient">
                Submit Application
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Loan Applications */}
      <div className="space-y-4">
        {loans.length === 0 ? (
          <Card className="banking-card text-center py-12">
            <CardContent>
              <Banknote className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Loan Applications</h3>
              <p className="text-muted-foreground mb-6">
                Apply for your first loan to get started with our lending services
              </p>
              <Button className="btn-gradient" onClick={() => setIsApplyDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Apply for Your First Loan
              </Button>
            </CardContent>
          </Card>
        ) : (
          loans.map((loan) => (
            <Card key={loan.id} className="banking-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(loan.status)}
                    <div>
                      <CardTitle className="capitalize">
                        {loan.type} Loan - ${loan.amount.toLocaleString()}
                      </CardTitle>
                      <CardDescription>
                        Applied on {loan.appliedDate.toLocaleDateString()}
                      </CardDescription>
                    </div>
                  </div>
                  {getStatusBadge(loan.status)}
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Loan Amount</p>
                    <p className="text-lg font-semibold">${loan.amount.toLocaleString()}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground">Duration</p>
                    <p className="text-lg font-semibold">{loan.duration} months</p>
                  </div>
                  
                  {loan.interestRate && (
                    <div>
                      <p className="text-sm text-muted-foreground">Interest Rate</p>
                      <p className="text-lg font-semibold">{loan.interestRate.toFixed(2)}%</p>
                    </div>
                  )}
                  
                  {loan.monthlyPayment && (
                    <div>
                      <p className="text-sm text-muted-foreground">Monthly Payment</p>
                      <p className="text-lg font-semibold text-primary">${loan.monthlyPayment.toFixed(2)}</p>
                    </div>
                  )}
                </div>
                
                <div className="mt-4">
                  <p className="text-sm text-muted-foreground mb-2">Purpose</p>
                  <p className="text-sm">{loan.purpose}</p>
                </div>
                
                <div className="flex space-x-2 mt-6">
                  <Button variant="outline" size="sm">
                    <FileText className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                  
                  {loan.status === 'approved' && (
                    <Button variant="outline" size="sm">
                      <Calendar className="h-4 w-4 mr-2" />
                      Payment Schedule
                    </Button>
                  )}
                  
                  {loan.status === 'pending' && (
                    <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive hover:text-destructive-foreground">
                      Cancel Application
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Loan Information */}
      <Card className="banking-card">
        <CardHeader>
          <CardTitle>Loan Information</CardTitle>
          <CardDescription>Important details about our loan services</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Interest Rates</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Personal Loan:</span>
                  <span className="font-medium">7.5% - 12.5% APR</span>
                </div>
                <div className="flex justify-between">
                  <span>Auto Loan:</span>
                  <span className="font-medium">4.5% - 8.5% APR</span>
                </div>
                <div className="flex justify-between">
                  <span>Home Loan:</span>
                  <span className="font-medium">3.5% - 6.5% APR</span>
                </div>
                <div className="flex justify-between">
                  <span>Business Loan:</span>
                  <span className="font-medium">8.0% - 15.0% APR</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Application Process</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>• Fill out our simple online application</p>
                <p>• Receive instant pre-approval decision</p>
                <p>• Upload required documents</p>
                <p>• Final approval within 24-48 hours</p>
                <p>• Funds disbursed to your account</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};