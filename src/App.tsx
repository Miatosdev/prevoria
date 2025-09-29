import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { MainLayout } from "@/components/Layout/MainLayout";

// Auth Pages
import { Login } from "@/pages/Login";
import { Register } from "@/pages/Register";

// Main Pages
import { Dashboard } from "@/pages/Dashboard";
import { NewTransaction } from "@/pages/NewTransaction";
import { Accounts } from "@/pages/Accounts";
import { Transactions } from "@/pages/Transactions";
import { VirtualCards } from "@/pages/VirtualCards";
import { Loans } from "@/pages/Loans";
import { Settings } from "@/pages/Settings";
import { Deposit } from "@/pages/Deposit";
import { LocalTransfer } from "@/pages/LocalTransfer";
import { InternationalTransfer } from "@/pages/InternationalTransfer";
import { TaxRefund } from "@/pages/TaxRefund";
import { LoanHistory } from "@/pages/LoanHistory";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <MainLayout>
                  <Dashboard />
                </MainLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/new-transaction" element={
              <ProtectedRoute>
                <MainLayout>
                  <NewTransaction />
                </MainLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/accounts" element={
              <ProtectedRoute>
                <MainLayout>
                  <Accounts />
                </MainLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/transactions" element={
              <ProtectedRoute>
                <MainLayout>
                  <Transactions />
                </MainLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/cards" element={
              <ProtectedRoute>
                <MainLayout>
                  <VirtualCards />
                </MainLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/loans" element={
              <ProtectedRoute>
                <MainLayout>
                  <Loans />
                </MainLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/settings" element={
              <ProtectedRoute>
                <MainLayout>
                  <Settings />
                </MainLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/deposit" element={
              <ProtectedRoute>
                <MainLayout>
                  <Deposit />
                </MainLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/local-transfer" element={
              <ProtectedRoute>
                <MainLayout>
                  <LocalTransfer />
                </MainLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/international-transfer" element={
              <ProtectedRoute>
                <MainLayout>
                  <InternationalTransfer />
                </MainLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/tax-refund" element={
              <ProtectedRoute>
                <MainLayout>
                  <TaxRefund />
                </MainLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/loan-history" element={
              <ProtectedRoute>
                <MainLayout>
                  <LoanHistory />
                </MainLayout>
              </ProtectedRoute>
            } />
            
            {/* Redirect root to dashboard */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            
            {/* 404 Page */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
