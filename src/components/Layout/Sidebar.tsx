import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  CreditCard, 
  ArrowUpDown, 
  Wallet, 
  Banknote, 
  Settings,
  LogOut,
  User
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const mainMenuItems = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: LayoutDashboard
  },
  {
    title: 'Transactions',
    url: '/transactions',
    icon: ArrowUpDown
  },
  {
    title: 'Cards',
    url: '/cards',
    icon: CreditCard
  }
];

const transferItems = [
  {
    title: 'Local Transfer',
    url: '/local-transfer',
    icon: ArrowUpDown
  },
  {
    title: 'International Wire',
    url: '/international-transfer',
    icon: ArrowUpDown
  },
  {
    title: 'Deposit',
    url: '/deposit',
    icon: ArrowUpDown
  }
];

const serviceItems = [
  {
    title: 'Loan Request',
    url: '/loans',
    icon: Banknote
  },
  {
    title: 'IRS Tax Refund',
    url: '/tax-refund',
    icon: Banknote
  },
  {
    title: 'Loan History',
    url: '/loan-history',
    icon: Banknote
  }
];

export const Sidebar: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="w-64 h-screen bg-surface border-r border-border fixed left-0 top-0 z-40">
      {/* Logo Section */}
      <div className="p-6 border-b border-border">
        <div className="gradient-primary rounded-lg p-3 w-fit">
          <Wallet className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-xl font-bold mt-3">Everstone Finance</h1>
        <p className="text-sm text-muted-foreground">Digital Banking</p>
      </div>

      {/* User Info */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 gradient-primary rounded-full flex items-center justify-center">
            <User className="h-5 w-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{user?.name}</p>
            <p className="text-xs text-muted-foreground truncate">{user?.account_number}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 flex-1 space-y-6">
        {/* Main Menu */}
        <div>
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            MAIN MENU
          </h3>
          <div className="space-y-1">
            {mainMenuItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.url}
                  to={item.url}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 text-sm ${
                    isActive(item.url)
                      ? 'gradient-primary text-white shadow-lg'
                      : 'text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="font-medium">{item.title}</span>
                </NavLink>
              );
            })}
          </div>
        </div>

        {/* Transfers */}
        <div>
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            TRANSFERS
          </h3>
          <div className="space-y-1">
            {transferItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.url}
                  to={item.url}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 text-sm ${
                    isActive(item.url)
                      ? 'gradient-primary text-white shadow-lg'
                      : 'text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="font-medium">{item.title}</span>
                </NavLink>
              );
            })}
          </div>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            SERVICES
          </h3>
          <div className="space-y-1">
            {serviceItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.url}
                  to={item.url}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 text-sm ${
                    isActive(item.url)
                      ? 'gradient-primary text-white shadow-lg'
                      : 'text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="font-medium">{item.title}</span>
                </NavLink>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-border">
        <button
          onClick={logout}
          className="flex items-center space-x-3 px-4 py-3 w-full text-left rounded-lg transition-all duration-200 text-foreground hover:bg-muted"
        >
          <LogOut className="h-5 w-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};