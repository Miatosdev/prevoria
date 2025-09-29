import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Send,
  CreditCard,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownLeft,
  History,
  Globe,
  Wallet,
  Info,
  DollarSign,
} from "lucide-react";
import axios from "axios";
import { InvestmentPortfolio } from "@/components/Dashboard/InvestmentPortfolio";
import { BillReminders } from "@/components/Dashboard/BillReminders";
import { SpendingInsights } from "@/components/Dashboard/SpendingInsights";
import { AccountStats } from "@/components/Dashboard/AccountStats";

interface Transaction {
  id: number;
  type: "credit" | "debit";
  description: string;
  merchant?: string;
  amount: string | number;
  status: "pending" | "completed" | "failed";
}

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) return;

    axios
      .get("http://127.0.0.1:8000/api/transactions", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setTransactions(res.data))
      .catch((err) => console.error("Error fetching transactions:", err));
  }, []);

  const formatTime = (date: Date) =>
    date.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <span className="status-success">Completed</span>;
      case "pending":
        return <span className="status-warning">Pending</span>;
      case "failed":
        return <span className="status-error">Failed</span>;
      default:
        return <span className="status-success">Completed</span>;
    }
  };

  return (
    <div className="space-y-6 fade-in">
      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="banking-card border-l-4 border-l-primary">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Current Balance</p>
                <p className="text-2xl font-bold text-primary">
                  ${user?.balance?.toLocaleString() || "0"}
                </p>
              </div>
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="banking-card border-l-4 border-l-success">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Monthly Income</p>
                <p className="text-2xl font-bold text-success">$0</p>
              </div>
              <div className="w-12 h-12 bg-success/20 rounded-full flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="banking-card border-l-4 border-l-destructive">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Monthly Outgoing</p>
                <p className="text-2xl font-bold text-destructive">$0</p>
              </div>
              <div className="w-12 h-12 bg-destructive/20 rounded-full flex items-center justify-center">
                <TrendingDown className="h-6 w-6 text-destructive" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="banking-card border-l-4 border-l-secondary">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Transaction Limit</p>
                <p className="text-2xl font-bold text-secondary">$500,000.00</p>
              </div>
              <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center">
                <CreditCard className="h-6 w-6 text-secondary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Balance + Sidebar */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="banking-card-elevated overflow-hidden">
            <div className="gradient-primary p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <div className="w-8 h-8 bg-white/30 rounded-full"></div>
                  </div>
                  <div>
                    <p className="text-white/90 text-sm">Good Afternoon</p>
                    <p className="text-white font-semibold">{user?.name || "Guest"}</p>
                  </div>
                </div>
                <div className="text-right text-white">
                  <p className="text-2xl font-bold">{formatTime(currentTime)}</p>
                  <p className="text-white/80 text-sm">
                    {currentTime.toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-white/80 text-sm mb-2">Available Balance</p>
                <p className="text-4xl font-bold text-white">
                  ${user?.balance?.toLocaleString() || "0"} USD
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 bg-white/60 rounded-full"></div>
                  </div>
                  <div>
                    <p className="text-white/80 text-xs">Your Account Number</p>
                    <p className="text-white font-medium">
                      {user?.account_number || "N/A"}
                    </p>
                  </div>
                  <div className="bg-destructive/80 text-white px-2 py-1 rounded text-xs">
                    ● Inactive
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                    onClick={() => navigate("/transactions")}
                  >
                    <TrendingUp className="h-4 w-4 mr-1" />
                    Transactions
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                    onClick={() => navigate("/new-transaction")}
                  >
                    <Wallet className="h-4 w-4 mr-1" />
                    Top up
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div>
          <AccountStats />
        </div>
      </div>

      {/* Quick Actions */}
      {/* ... (unchanged UI for actions & insights) ... */}

      {/* Recent Transactions */}
      <Card className="banking-card">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              Recent Transactions
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/transactions")}
            >
              View All
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {transactions.slice(0, 5).map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      transaction.type === "credit"
                        ? "bg-success/20"
                        : "bg-destructive/20"
                    }`}
                  >
                    {transaction.type === "credit" ? (
                      <TrendingUp className="h-5 w-5 text-success" />
                    ) : (
                      <TrendingDown className="h-5 w-5 text-destructive" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{transaction.description}</p>
                    <p className="text-xs text-muted-foreground">{transaction.merchant}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className={`font-bold ${
                      transaction.type === "credit"
                        ? "text-success"
                        : "text-destructive"
                    }`}
                  >
                    {transaction.type === "credit" ? "+" : "-"}$
                    {Number(transaction.amount).toFixed(2)}
                  </p>
                  {getStatusBadge(transaction.status)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
