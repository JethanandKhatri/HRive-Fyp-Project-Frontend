import { useState } from "react";
import { EmployeeLayout } from "@/components/layout/EmployeeLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Download, Receipt, FileText, TrendingUp, TrendingDown } from "lucide-react";

const payslipData = {
  month: "November 2024",
  payDate: "Nov 30, 2024",
  earnings: [
    { label: "Basic Salary", amount: 3500 },
    { label: "Housing Allowance", amount: 800 },
    { label: "Transport Allowance", amount: 300 },
    { label: "Performance Bonus", amount: 500 },
  ],
  deductions: [
    { label: "Income Tax", amount: 175 },
    { label: "Social Security", amount: 50 },
    { label: "Health Insurance", amount: 25 },
  ],
};

const payslipHistory = [
  { month: "November 2024", amount: 4850, status: "Paid" },
  { month: "October 2024", amount: 4600, status: "Paid" },
  { month: "September 2024", amount: 4600, status: "Paid" },
  { month: "August 2024", amount: 4600, status: "Paid" },
  { month: "July 2024", amount: 4350, status: "Paid" },
];

export default function EmployeePayslips() {
  const [selectedMonth, setSelectedMonth] = useState("november-2024");

  const totalEarnings = payslipData.earnings.reduce((sum, item) => sum + item.amount, 0);
  const totalDeductions = payslipData.deductions.reduce((sum, item) => sum + item.amount, 0);
  const netPay = totalEarnings - totalDeductions;

  return (
    <EmployeeLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Payslips</h1>
            <p className="text-muted-foreground">View your salary details</p>
          </div>

          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select month" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="november-2024">November 2024</SelectItem>
              <SelectItem value="october-2024">October 2024</SelectItem>
              <SelectItem value="september-2024">September 2024</SelectItem>
              <SelectItem value="august-2024">August 2024</SelectItem>
              <SelectItem value="july-2024">July 2024</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="shadow-card">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Total Earnings</p>
                  <p className="text-2xl font-bold text-success">
                    ${totalEarnings.toLocaleString()}
                  </p>
                </div>
                <div className="p-2.5 rounded-xl bg-success/10 text-success">
                  <TrendingUp className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Total Deductions</p>
                  <p className="text-2xl font-bold text-destructive">
                    ${totalDeductions.toLocaleString()}
                  </p>
                </div>
                <div className="p-2.5 rounded-xl bg-destructive/10 text-destructive">
                  <TrendingDown className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card bg-primary/5 border-primary/20">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Net Pay</p>
                  <p className="text-2xl font-bold text-primary">
                    ${netPay.toLocaleString()}
                  </p>
                </div>
                <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                  <Receipt className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Payslip */}
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <div>
              <CardTitle className="text-lg font-semibold">
                Payslip - {payslipData.month}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Payment Date: {payslipData.payDate}
              </p>
            </div>
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Download PDF
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Earnings */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-success" />
                  Earnings
                </h3>
                <div className="space-y-3">
                  {payslipData.earnings.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{item.label}</span>
                      <span className="text-sm font-medium text-foreground">
                        ${item.amount.toLocaleString()}
                      </span>
                    </div>
                  ))}
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-foreground">Total Earnings</span>
                    <span className="text-sm font-bold text-success">
                      ${totalEarnings.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Deductions */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                  <TrendingDown className="h-4 w-4 text-destructive" />
                  Deductions
                </h3>
                <div className="space-y-3">
                  {payslipData.deductions.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{item.label}</span>
                      <span className="text-sm font-medium text-foreground">
                        ${item.amount.toLocaleString()}
                      </span>
                    </div>
                  ))}
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-foreground">Total Deductions</span>
                    <span className="text-sm font-bold text-destructive">
                      ${totalDeductions.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Net Pay */}
            <div className="mt-6 p-4 rounded-lg bg-primary/5 border border-primary/20">
              <div className="flex items-center justify-between">
                <span className="text-base font-semibold text-foreground">Net Pay</span>
                <span className="text-2xl font-bold text-primary">
                  ${netPay.toLocaleString()}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payslip History */}
        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold">Payslip History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {payslipHistory.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      <FileText className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{item.month}</p>
                      <p className="text-sm text-muted-foreground">{item.status}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-semibold text-foreground">
                      ${item.amount.toLocaleString()}
                    </span>
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </EmployeeLayout>
  );
}
