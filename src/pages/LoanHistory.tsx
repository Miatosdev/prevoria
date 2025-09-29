import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Search, Filter, Download, Eye, Clock, DollarSign, Calendar, CheckCircle, AlertCircle, XCircle } from 'lucide-react';

interface Loan {
  id: string;
  type: string;
  amount: number;
  remainingBalance: number;
  interestRate: number;
  term: string;
  status: 'active' | 'paid' | 'pending' | 'defaulted';
  applicationDate: string;
  approvalDate?: string;
  nextPaymentDate?: string;
  monthlyPayment: number;
  purpose: string;
}

export const LoanHistory: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const loans: Loan[] = [
    {
      id: 'L001',
      type: 'Personal Loan',
      amount: 15000,
      remainingBalance: 8750,
      interestRate: 5.99,
      term: '3 years',
      status: 'active',
      applicationDate: '2023-06-15',
      approvalDate: '2023-06-18',
      nextPaymentDate: '2024-02-15',
      monthlyPayment: 450.12,
      purpose: 'Home Improvement'
    },
    {
      id: 'L002',
      type: 'Auto Loan',
      amount: 25000,
      remainingBalance: 18500,
      interestRate: 3.75,
      term: '5 years',
      status: 'active',
      applicationDate: '2023-03-10',
      approvalDate: '2023-03-12',
      nextPaymentDate: '2024-02-10',
      monthlyPayment: 458.33,
      purpose: 'Vehicle Purchase'
    },
    {
      id: 'L003',
      type: 'Business Loan',
      amount: 50000,
      remainingBalance: 0,
      interestRate: 6.25,
      term: '2 years',
      status: 'paid',
      applicationDate: '2022-01-20',
      approvalDate: '2022-01-25',
      monthlyPayment: 2208.45,
      purpose: 'Business Expansion'
    },
    {
      id: 'L004',
      type: 'Student Loan',
      amount: 12000,
      remainingBalance: 12000,
      interestRate: 4.50,
      term: '4 years',
      status: 'pending',
      applicationDate: '2024-01-10',
      monthlyPayment: 271.25,
      purpose: 'Education'
    }
  ];

  const filteredLoans = loans.filter(loan => {
    const matchesSearch = loan.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         loan.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         loan.purpose.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || loan.status === statusFilter;
    const matchesType = typeFilter === 'all' || loan.type.toLowerCase().includes(typeFilter.toLowerCase());
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'paid':
        return <CheckCircle className="h-4 w-4 text-primary" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-warning" />;
      case 'defaulted':
        return <XCircle className="h-4 w-4 text-destructive" />;
      default:
        return <AlertCircle className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      active: 'default',
      paid: 'secondary',
      pending: 'outline',
      defaulted: 'destructive'
    } as const;

    return (
      <Badge variant={variants[status as keyof typeof variants] || 'outline'}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const totalLoanAmount = loans.reduce((sum, loan) => sum + loan.amount, 0);
  const totalRemainingBalance = loans.reduce((sum, loan) => sum + loan.remainingBalance, 0);
  const activeLoanCount = loans.filter(loan => loan.status === 'active').length;

  return (
    <div className="space-y-6 fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Loan History</h1>
            <p className="text-muted-foreground">View and manage all your loan applications</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button onClick={() => navigate('/loans')} className="btn-gradient">
            Apply for New Loan
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="banking-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Borrowed</p>
                <p className="text-2xl font-bold text-primary">${totalLoanAmount.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-primary/30" />
            </div>
          </CardContent>
        </Card>

        <Card className="banking-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Remaining Balance</p>
                <p className="text-2xl font-bold text-warning">${totalRemainingBalance.toLocaleString()}</p>
              </div>
              <Calendar className="h-8 w-8 text-warning/30" />
            </div>
          </CardContent>
        </Card>

        <Card className="banking-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Loans</p>
                <p className="text-2xl font-bold text-success">{activeLoanCount}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-success/30" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="banking-card">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search loans by ID, type, or purpose..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="defaulted">Defaulted</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="personal">Personal</SelectItem>
                  <SelectItem value="auto">Auto</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="student">Student</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Loan List */}
      <Card className="banking-card">
        <CardHeader>
          <CardTitle>Loan Applications</CardTitle>
          <CardDescription>
            {filteredLoans.length} of {loans.length} loans
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredLoans.map((loan) => (
              <div key={loan.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(loan.status)}
                    <div>
                      <h3 className="font-semibold">{loan.type}</h3>
                      <p className="text-sm text-muted-foreground">ID: {loan.id}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusBadge(loan.status)}
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Loan Amount</p>
                    <p className="font-semibold">${loan.amount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Remaining Balance</p>
                    <p className="font-semibold">${loan.remainingBalance.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Interest Rate</p>
                    <p className="font-semibold">{loan.interestRate}%</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Monthly Payment</p>
                    <p className="font-semibold">${loan.monthlyPayment.toFixed(2)}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mt-3 text-sm">
                  <div>
                    <p className="text-muted-foreground">Application Date</p>
                    <p className="font-medium">{new Date(loan.applicationDate).toLocaleDateString()}</p>
                  </div>
                  {loan.approvalDate && (
                    <div>
                      <p className="text-muted-foreground">Approval Date</p>
                      <p className="font-medium">{new Date(loan.approvalDate).toLocaleDateString()}</p>
                    </div>
                  )}
                  {loan.nextPaymentDate && (
                    <div>
                      <p className="text-muted-foreground">Next Payment</p>
                      <p className="font-medium">{new Date(loan.nextPaymentDate).toLocaleDateString()}</p>
                    </div>
                  )}
                </div>

                <div className="mt-3 text-sm">
                  <p className="text-muted-foreground">Purpose</p>
                  <p className="font-medium">{loan.purpose}</p>
                </div>

                {loan.status === 'active' && (
                  <div className="mt-4 flex space-x-2">
                    <Button variant="outline" size="sm">
                      Make Payment
                    </Button>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                    <Button variant="outline" size="sm">
                      Download Statement
                    </Button>
                  </div>
                )}
              </div>
            ))}

            {filteredLoans.length === 0 && (
              <div className="text-center py-8">
                <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">No loans found</h3>
                <p className="text-muted-foreground">No loans match your current filters.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};