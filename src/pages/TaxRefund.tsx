import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, FileText, Calculator, Upload, CheckCircle } from 'lucide-react';

export const TaxRefund: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    socialSecurity: '',
    firstName: '',
    lastName: '',
    refundAmount: '',
    bankAccount: '',
    taxYear: '',
    filingStatus: '',
    additionalNotes: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    toast({
      title: "Tax Refund Request Submitted",
      description: "Your tax refund request has been submitted successfully. Processing time is 7-14 business days."
    });

    setIsSubmitting(false);
    navigate('/dashboard');
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6 fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">IRS Tax Refund</h1>
            <p className="text-muted-foreground">Request your tax refund directly to your account</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2">
          <Card className="banking-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Tax Refund Request
              </CardTitle>
              <CardDescription>
                Fill out the form below to request your IRS tax refund
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      placeholder="Enter your first name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      placeholder="Enter your last name"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="socialSecurity">Social Security Number</Label>
                  <Input
                    id="socialSecurity"
                    value={formData.socialSecurity}
                    onChange={(e) => handleInputChange('socialSecurity', e.target.value)}
                    placeholder="XXX-XX-XXXX"
                    maxLength={11}
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="taxYear">Tax Year</Label>
                    <Select onValueChange={(value) => handleInputChange('taxYear', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select tax year" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2023">2023</SelectItem>
                        <SelectItem value="2022">2022</SelectItem>
                        <SelectItem value="2021">2021</SelectItem>
                        <SelectItem value="2020">2020</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="filingStatus">Filing Status</Label>
                    <Select onValueChange={(value) => handleInputChange('filingStatus', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select filing status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="single">Single</SelectItem>
                        <SelectItem value="married-joint">Married Filing Jointly</SelectItem>
                        <SelectItem value="married-separate">Married Filing Separately</SelectItem>
                        <SelectItem value="head-household">Head of Household</SelectItem>
                        <SelectItem value="qualifying-widow">Qualifying Widow(er)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="refundAmount">Expected Refund Amount</Label>
                  <Input
                    id="refundAmount"
                    type="number"
                    value={formData.refundAmount}
                    onChange={(e) => handleInputChange('refundAmount', e.target.value)}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="bankAccount">Deposit Account</Label>
                  <Select onValueChange={(value) => handleInputChange('bankAccount', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select account for deposit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="primary">Primary Checking (****1234)</SelectItem>
                      <SelectItem value="savings">High Yield Savings (****5678)</SelectItem>
                      <SelectItem value="business">Business Account (****9012)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="additionalNotes">Additional Notes (Optional)</Label>
                  <Textarea
                    id="additionalNotes"
                    value={formData.additionalNotes}
                    onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
                    placeholder="Any additional information or special circumstances"
                    rows={3}
                  />
                </div>

                <div className="flex space-x-4">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => navigate(-1)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="flex-1 btn-gradient"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Request'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Info Sidebar */}
        <div className="space-y-6">
          <Card className="banking-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calculator className="h-5 w-5 mr-2" />
                Refund Calculator
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center p-4 bg-success/10 rounded-lg">
                  <p className="text-sm text-muted-foreground">Estimated Refund</p>
                  <p className="text-2xl font-bold text-success">
                    ${formData.refundAmount || '0.00'}
                  </p>
                </div>
                <div className="text-sm text-muted-foreground space-y-2">
                  <p>• Processing time: 7-14 business days</p>
                  <p>• Direct deposit available</p>
                  <p>• No additional fees</p>
                  <p>• Secure IRS integration</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="banking-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Upload className="h-5 w-5 mr-2" />
                Required Documents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span className="text-sm">Social Security Card</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span className="text-sm">Tax Return (Form 1040)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span className="text-sm">W-2 Forms</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span className="text-sm">Bank Account Information</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};