export interface Transaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  date: Date;
  status: 'completed' | 'pending' | 'failed';
  category: string;
  merchant?: string;
}

export interface VirtualCard {
  id: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardType: 'visa' | 'mastercard';
  status: 'active' | 'blocked' | 'expired';
  limit: number;
  spent: number;
  name: string;
}

export interface LoanApplication {
  id: string;
  type: 'personal' | 'auto' | 'home' | 'business';
  amount: number;
  duration: number;
  purpose: string;
  status: 'pending' | 'approved' | 'rejected';
  interestRate?: number;
  monthlyPayment?: number;
  appliedDate: Date;
}

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'credit',
    amount: 2500.00,
    description: 'Salary Payment',
    date: new Date('2024-01-15'),
    status: 'completed',
    category: 'Income',
    merchant: 'ABC Corporation'
  },
  {
    id: '2',
    type: 'debit',
    amount: 75.50,
    description: 'Grocery Shopping',
    date: new Date('2024-01-14'),
    status: 'completed',
    category: 'Food & Dining',
    merchant: 'Whole Foods Market'
  },
  {
    id: '3',
    type: 'debit',
    amount: 45.00,
    description: 'Gas Station',
    date: new Date('2024-01-13'),
    status: 'completed',
    category: 'Transportation',
    merchant: 'Shell'
  },
  {
    id: '4',
    type: 'credit',
    amount: 150.00,
    description: 'Cashback Reward',
    date: new Date('2024-01-12'),
    status: 'completed',
    category: 'Rewards'
  },
  {
    id: '5',
    type: 'debit',
    amount: 1200.00,
    description: 'Rent Payment',
    date: new Date('2024-01-01'),
    status: 'completed',
    category: 'Housing',
    merchant: 'Property Management Co'
  },
  {
    id: '6',
    type: 'debit',
    amount: 89.99,
    description: 'Netflix Subscription',
    date: new Date('2024-01-10'),
    status: 'pending',
    category: 'Entertainment',
    merchant: 'Netflix'
  }
];

export const mockVirtualCards: VirtualCard[] = [
  {
    id: '1',
    cardNumber: '**** **** **** 1234',
    expiryDate: '12/26',
    cvv: '***',
    cardType: 'visa',
    status: 'active',
    limit: 5000,
    spent: 1250.75,
    name: 'Primary Card'
  },
  {
    id: '2',
    cardNumber: '**** **** **** 5678',
    expiryDate: '08/27',
    cvv: '***',
    cardType: 'mastercard',
    status: 'active',
    limit: 2000,
    spent: 450.30,
    name: 'Shopping Card'
  }
];

export const mockLoanApplications: LoanApplication[] = [
  {
    id: '1',
    type: 'personal',
    amount: 10000,
    duration: 24,
    purpose: 'Home renovation',
    status: 'approved',
    interestRate: 8.5,
    monthlyPayment: 456.78,
    appliedDate: new Date('2024-01-01')
  },
  {
    id: '2',
    type: 'auto',
    amount: 25000,
    duration: 60,
    purpose: 'Car purchase',
    status: 'pending',
    appliedDate: new Date('2024-01-10')
  }
];

export const quickActions = [
  {
    id: 'send-money',
    title: 'Send Money',
    description: 'Transfer funds to another account',
    icon: 'send'
  },
  {
    id: 'fund-wallet',
    title: 'Fund Wallet',
    description: 'Add money to your account',
    icon: 'plus'
  },
  {
    id: 'request-loan',
    title: 'Request Loan',
    description: 'Apply for a personal loan',
    icon: 'credit-card'
  },
  {
    id: 'pay-bills',
    title: 'Pay Bills',
    description: 'Pay your utility bills',
    icon: 'receipt'
  }
];