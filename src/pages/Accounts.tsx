import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@/contexts/AuthContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  Wallet,
  PiggyBank,
  Building,
  Plus,
  Send,
  Star,
  Users,
} from "lucide-react";

export const Accounts: React.FC = () => {
  const { toast } = useToast();

  const API_URL = "http://127.0.0.1:8000/api";

  const [accounts, setAccounts] = useState<any[]>([]);
  const [beneficiaries, setBeneficiaries] = useState<any[]>([]);

  const [showAddAccount, setShowAddAccount] = useState(false);
  const [showAddBeneficiary, setShowAddBeneficiary] = useState(false);

  // Fetch accounts and beneficiaries
  useEffect(() => {
    fetchAccounts();
    fetchBeneficiaries();
  }, []);

  const fetchAccounts = async () => {
    try {
      const res = await axios.get(`${API_URL}/accounts`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
      });
      setAccounts(res.data.data);
    } catch (error) {
      console.error("Failed to fetch accounts", error);
    }
  };

  const fetchBeneficiaries = async () => {
    try {
      const res = await axios.get(`${API_URL}/beneficiaries`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
      });
      setBeneficiaries(res.data.data);
    } catch (error) {
      console.error("Failed to fetch beneficiaries", error);
    }
  };

  const handleAddAccount = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const newAccount = {
      name: formData.get("accountName"),
      type: formData.get("accountType"),
      currency: formData.get("currency"),
    };

    try {
      await axios.post(`${API_URL}/accounts`, newAccount, {
        headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
      });

      toast({
        title: "Account Added",
        description: `${newAccount.name} has been created successfully.`,
      });

      await fetchAccounts();
      setShowAddAccount(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description:
          error.response?.data?.message || "Could not add account",
        variant: "destructive",
      });
    }
  };

  const handleAddBeneficiary = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const newBeneficiary = {
      name: formData.get("name"),
      account_number: formData.get("account_number"),
      bank: formData.get("bank"),
    };

    try {
      await axios.post(`${API_URL}/beneficiaries`, newBeneficiary, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      toast({
        title: "Beneficiary Added",
        description: `${newBeneficiary.name} saved successfully.`,
      });

      await fetchBeneficiaries();
      setShowAddBeneficiary(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description:
          error.response?.data?.message || "Could not add beneficiary",
        variant: "destructive",
      });
    }
  };

  const handleDeleteBeneficiary = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/beneficiaries/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
      });

      toast({
        title: "Deleted",
        description: "Beneficiary removed successfully.",
      });

      await fetchBeneficiaries();
    } catch (error: any) {
      toast({
        title: "Error",
        description:
          error.response?.data?.message || "Could not delete beneficiary",
        variant: "destructive",
      });
    }
  };

  const setPrimaryAccount = async (id: number) => {
    try {
      await axios.put(
        `${API_URL}/accounts/${id}/primary`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
        }
      );

      toast({
        title: "Primary Account Updated",
        description: "Your primary account has been changed successfully.",
      });

      await fetchAccounts();
    } catch (error: any) {
      toast({
        title: "Error",
        description:
          error.response?.data?.message || "Could not set primary account",
        variant: "destructive",
      });
    }
  };

  const getIconForType = (type: string) => {
    switch (type) {
      case "savings":
        return PiggyBank;
      case "business":
        return Building;
      default:
        return Wallet;
    }
  };

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

          <Dialog open={showAddBeneficiary} onOpenChange={setShowAddBeneficiary}>
            <DialogTrigger asChild>
              <Button className="btn-gradient">
                <Users className="h-4 w-4 mr-2" />
                Add Beneficiary
              </Button>
            </DialogTrigger>
          </Dialog>
        </div>
      </div>

      {/* Account Cards */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {accounts.map((account) => {
          const Icon = getIconForType(account.type);
          return (
            <Card key={account.id} className="banking-card-elevated overflow-hidden">
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-6 text-white relative">
                {account.is_primary && (
                  <Star className="absolute top-4 right-4 h-5 w-5 text-yellow-300 fill-yellow-300" />
                )}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/80 text-sm">{account.name}</p>
                    <Badge className="text-xs">{account.status}</Badge>
                    <p className="text-3xl font-bold">
                      {account.currency} ${Number(account.balance).toLocaleString()}
                    </p>
                    <p className="text-white/80 text-sm mt-1">
                      {account.account_number}
                    </p>
                  </div>
                  <Icon className="h-12 w-12 text-white/30" />
                </div>
              </div>
              <CardContent className="p-6 space-y-3">
                {!account.is_primary && (
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
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Beneficiaries */}
      <Card className="banking-card">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="h-5 w-5 mr-2" />
            Saved Beneficiaries
          </CardTitle>
          <CardDescription>
            Quick access to your frequent recipients
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {beneficiaries.map((beneficiary) => (
              <div
                key={beneficiary.id}
                className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{beneficiary.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {beneficiary.account_number}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {beneficiary.bank}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Send className="h-3 w-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDeleteBeneficiary(beneficiary.id)}
                    >
                      Delete
                    </Button>
                  </div>
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
              <Input id="accountName" name="accountName" required />
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
                </SelectContent>
              </Select>
            </div>

            <div className="flex space-x-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowAddAccount(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button type="submit" className="flex-1">
                Add Account
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Add Beneficiary Modal */}
      <Dialog open={showAddBeneficiary} onOpenChange={setShowAddBeneficiary}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Beneficiary</DialogTitle>
            <DialogDescription>
              Save recipient details for quick transfers.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleAddBeneficiary} className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" name="name" required />
            </div>

            <div>
              <Label htmlFor="account_number">Account Number</Label>
              <Input id="account_number" name="account_number" required />
            </div>

            <div>
              <Label htmlFor="bank">Bank</Label>
              <Input id="bank" name="bank" required />
            </div>

            <div className="flex space-x-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowAddBeneficiary(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button type="submit" className="flex-1">
                Save Beneficiary
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};