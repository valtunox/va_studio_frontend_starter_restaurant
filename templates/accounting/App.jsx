import { useState } from 'react'
import {
  LayoutDashboard, BookOpen, Receipt, ArrowDownLeft, ArrowUpRight, Calculator, BarChart3, Settings,
  Menu, X, Search, ChevronDown, Plus, Download, DollarSign, TrendingUp, TrendingDown,
  PieChart, FileText, Calendar
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

/* ------------------------------------------------------------------ */
/*  MOCK DATA                                                          */
/* ------------------------------------------------------------------ */

const sidebarLinks = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '#', active: true },
  { icon: BookOpen, label: 'General Ledger', href: '#' },
  { icon: Receipt, label: 'Invoices', href: '#' },
  { icon: ArrowDownLeft, label: 'Accounts Payable', href: '#' },
  { icon: ArrowUpRight, label: 'Accounts Receivable', href: '#' },
  { icon: Calculator, label: 'Tax Center', href: '#' },
  { icon: BarChart3, label: 'Reports', href: '#' },
  { icon: Settings, label: 'Settings', href: '#' },
]

const fiscalPeriods = ['Q1 2026', 'Q2 2026', 'Q3 2026', 'Q4 2026']

const kpiCards = [
  { label: 'Total Revenue', value: '$248,500', change: '+12.4%', trend: 'up', icon: DollarSign },
  { label: 'Accounts Receivable', value: '$42,300', sublabel: '18 outstanding', trend: 'neutral', icon: ArrowUpRight },
  { label: 'Accounts Payable', value: '$28,750', sublabel: '12 pending', trend: 'neutral', icon: ArrowDownLeft },
  { label: 'Net Profit', value: '$68,200', change: '+8.7%', trend: 'up', icon: TrendingUp },
]

const ledgerCategories = [
  { name: 'Assets', balance: 485200, color: 'from-slate-500 to-zinc-600' },
  { name: 'Liabilities', balance: 142800, color: 'from-slate-600 to-zinc-700' },
  { name: 'Equity', balance: 342400, color: 'from-slate-500 to-zinc-600' },
  { name: 'Revenue', balance: 248500, color: 'from-slate-500 to-zinc-600' },
  { name: 'Expenses', balance: 180300, color: 'from-slate-600 to-zinc-700' },
]

const outstandingInvoices = [
  { id: 'INV-001', amount: 4500, dueDate: 'Feb 28', status: 'Overdue' },
  { id: 'INV-002', amount: 2800, dueDate: 'Mar 5', status: 'Pending' },
  { id: 'INV-003', amount: 6200, dueDate: 'Mar 10', status: 'Pending' },
  { id: 'INV-004', amount: 1950, dueDate: 'Mar 15', status: 'Draft' },
]

const taxSummary = {
  estimatedTax: 18450,
  taxRate: '25.2%',
  deductions: 12300,
  nextFiling: 'Apr 15, 2026',
}

const journalEntries = [
  { date: 'Feb 17', entry: 'JE-1042', description: 'Client Payment Received', debit: 4500, credit: null, account: 'Accounts Receivable' },
  { date: 'Feb 16', entry: 'JE-1041', description: 'Office Supplies Purchase', debit: null, credit: 342, account: 'Office Expenses' },
  { date: 'Feb 15', entry: 'JE-1040', description: 'Monthly Rent Payment', debit: null, credit: 3200, account: 'Rent Expense' },
  { date: 'Feb 14', entry: 'JE-1039', description: 'Invoice #INV-005 Issued', debit: 8400, credit: null, account: 'Revenue' },
  { date: 'Feb 13', entry: 'JE-1038', description: 'Payroll Processing', debit: null, credit: 24500, account: 'Salaries' },
  { date: 'Feb 12', entry: 'JE-1037', description: 'Equipment Depreciation', debit: null, credit: 1200, account: 'Depreciation' },
]

const profitLossData = [
  { month: 'Nov', revenue: 52000, expenses: 38000 },
  { month: 'Dec', revenue: 61000, expenses: 42000 },
  { month: 'Jan', revenue: 58000, expenses: 41000 },
  { month: 'Feb', revenue: 62000, expenses: 45000 },
]

/* ------------------------------------------------------------------ */
/*  APP                                                                */
/* ------------------------------------------------------------------ */

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedPeriod, setSelectedPeriod] = useState('Q1 2026')

  const totalLedger = ledgerCategories.reduce((sum, c) => sum + c.balance, 0)
  const maxPL = Math.max(...profitLossData.flatMap((d) => [d.revenue, d.expenses]))

  const statusStyles = {
    Overdue: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
    Pending: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400',
    Draft: 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400',
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans">

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full w-60 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 z-40 transform transition-transform lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-slate-500 to-zinc-600 flex items-center justify-center">
              <PieChart className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold font-display">Accounting Suite</span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="p-3 space-y-0.5">
          {sidebarLinks.map(({ icon: Icon, label, href, active }) => (
            <a
              key={label}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Icon className="w-4.5 h-4.5 shrink-0" />
              <span className="flex-1">{label}</span>
              <ChevronDown className="w-4 h-4 text-slate-400 rotate-[-90deg]" />
            </a>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <div className="lg:pl-60">
        {/* Header */}
        <header className="sticky top-0 h-14 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 flex items-center gap-4 px-4 sm:px-6 z-30">
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
              <Menu className="w-5 h-5" />
            </button>
            <div className="relative flex items-center gap-2 bg-slate-100 dark:bg-slate-800 rounded-lg px-3 py-2 min-w-[120px]">
              <Calendar className="w-4 h-4 text-slate-600 dark:text-slate-400 shrink-0" />
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="bg-transparent border-0 text-sm font-medium text-slate-900 dark:text-slate-100 cursor-pointer focus:ring-0 focus:outline-none appearance-none pr-6"
              >
                {fiscalPeriods.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2 pointer-events-none" />
            </div>
            <div className="relative hidden sm:block flex-1 max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search transactions..."
                className="h-9 pl-9 bg-slate-100 dark:bg-slate-800 border-0 text-sm"
              />
            </div>
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <Button
              size="sm"
              className="bg-gradient-to-r from-slate-500 to-zinc-600 hover:from-slate-600 hover:to-zinc-700 text-white border-0 shadow-lg shadow-slate-500/25"
            >
              <Plus className="w-3.5 h-3.5 mr-1.5" />
              New Invoice
            </Button>
            <Button variant="outline" size="sm" className="hidden sm:flex">
              <Download className="w-3.5 h-3.5 mr-1.5" />
              Export
            </Button>
          </div>
        </header>

        {/* Content */}
        <main className="p-4 sm:p-6 space-y-6">
          <div>
            <h1 className="text-2xl font-bold font-display">Dashboard</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Financial overview for {selectedPeriod}</p>
          </div>

          {/* KPI Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {kpiCards.map(({ label, value, change, sublabel, trend, icon: Icon }) => (
              <Card key={label} className="border-slate-200 dark:border-slate-800 hover:shadow-md transition-shadow">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-slate-500 dark:text-slate-400">{label}</span>
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-slate-500/20 to-zinc-600/20 dark:from-slate-500/30 dark:to-zinc-600/30 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                    </div>
                  </div>
                  <p className="text-2xl font-bold font-display mb-1">{value}</p>
                  <div className="flex items-center gap-1">
                    {change && (
                      trend === 'up' ? (
                        <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5">
                          <TrendingUp className="w-4 h-4" />
                          {change}
                        </span>
                      ) : (
                        <span className="text-sm font-medium text-red-600 dark:text-red-400 flex items-center gap-0.5">
                          <TrendingDown className="w-4 h-4" />
                          {change}
                        </span>
                      )
                    )}
                    {sublabel && (
                      <span className="text-sm text-slate-500 dark:text-slate-400">{sublabel}</span>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* General Ledger Summary */}
            <Card className="border-slate-200 dark:border-slate-800 lg:col-span-2 overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-slate-500 to-zinc-600" />
              <CardHeader className="pb-3">
                <CardTitle className="font-display flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                  General Ledger Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {ledgerCategories.map((cat) => {
                    const pct = totalLedger > 0 ? (cat.balance / totalLedger) * 100 : 0
                    return (
                      <div key={cat.name} className="space-y-1.5">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium">{cat.name}</span>
                          <span className="text-slate-600 dark:text-slate-400 font-mono">
                            ${cat.balance.toLocaleString()}
                          </span>
                        </div>
                        <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full bg-gradient-to-r ${cat.color} transition-all`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Outstanding Invoices */}
              <Card className="border-slate-200 dark:border-slate-800">
                <CardHeader>
                  <CardTitle className="font-display text-base flex items-center gap-2">
                    <Receipt className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                    Outstanding Invoices
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {outstandingInvoices.map((inv) => (
                      <div
                        key={inv.id}
                        className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50"
                      >
                        <div>
                          <p className="font-medium text-sm">{inv.id}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">Due {inv.dueDate}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">${inv.amount.toLocaleString()}</p>
                          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${statusStyles[inv.status]}`}>
                            {inv.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Tax Summary */}
              <Card className="border-slate-200 dark:border-slate-800">
                <CardHeader>
                  <CardTitle className="font-display text-base flex items-center gap-2">
                    <Calculator className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                    Tax Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500 dark:text-slate-400">Estimated Tax</span>
                      <span className="font-semibold">${taxSummary.estimatedTax.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500 dark:text-slate-400">Tax Rate</span>
                      <span className="font-semibold">{taxSummary.taxRate}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500 dark:text-slate-400">Deductions</span>
                      <span className="font-semibold">${taxSummary.deductions.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm pt-2 border-t border-slate-200 dark:border-slate-700">
                      <span className="text-slate-500 dark:text-slate-400">Next Filing</span>
                      <span className="font-semibold">{taxSummary.nextFiling}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Recent Journal Entries */}
          <Card className="border-slate-200 dark:border-slate-800">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2">
                <FileText className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                Recent Journal Entries
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800">
                      <th className="text-left py-3 px-2 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Date</th>
                      <th className="text-left py-3 px-2 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Entry #</th>
                      <th className="text-left py-3 px-2 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Description</th>
                      <th className="text-right py-3 px-2 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Debit</th>
                      <th className="text-right py-3 px-2 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Credit</th>
                      <th className="text-left py-3 px-2 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider hidden md:table-cell">Account</th>
                    </tr>
                  </thead>
                  <tbody>
                    {journalEntries.map((je, i) => (
                      <tr key={i} className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                        <td className="py-3 px-2 text-slate-600 dark:text-slate-400">{je.date}</td>
                        <td className="py-3 px-2 font-mono font-medium">{je.entry}</td>
                        <td className="py-3 px-2">{je.description}</td>
                        <td className="py-3 px-2 text-right font-mono">
                          {je.debit != null ? `$${je.debit.toLocaleString()}` : '—'}
                        </td>
                        <td className="py-3 px-2 text-right font-mono">
                          {je.credit != null ? `$${je.credit.toLocaleString()}` : '—'}
                        </td>
                        <td className="py-3 px-2 text-slate-600 dark:text-slate-400 hidden md:table-cell">{je.account}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Profit & Loss Summary */}
          <Card className="border-slate-200 dark:border-slate-800">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                Profit & Loss Summary
              </CardTitle>
              <p className="text-xs text-slate-500 dark:text-slate-400">Revenue vs Expenses — Last 4 months</p>
            </CardHeader>
            <CardContent>
              <div className="flex items-end gap-4 sm:gap-8 h-40">
                {profitLossData.map((d) => (
                  <div key={d.month} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full flex flex-col items-center justify-end gap-1 h-32">
                      <div
                        className="w-full max-w-[40px] rounded-t bg-gradient-to-t from-slate-500 to-zinc-600"
                        style={{ height: `${(d.revenue / maxPL) * 100}%` }}
                      />
                      <div
                        className="w-full max-w-[40px] rounded-t bg-gradient-to-t from-slate-600 to-zinc-700 opacity-70"
                        style={{ height: `${(d.expenses / maxPL) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium text-slate-600 dark:text-slate-400">{d.month}</span>
                    <div className="flex gap-3 text-xs text-slate-500 dark:text-slate-400">
                      <span>Rev: ${(d.revenue / 1000).toFixed(0)}k</span>
                      <span>Exp: ${(d.expenses / 1000).toFixed(0)}k</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-6 mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-gradient-to-r from-slate-500 to-zinc-600" />
                  <span className="text-sm text-slate-600 dark:text-slate-400">Revenue</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-gradient-to-r from-slate-600 to-zinc-700 opacity-70" />
                  <span className="text-sm text-slate-600 dark:text-slate-400">Expenses</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
  )
}

export default App
