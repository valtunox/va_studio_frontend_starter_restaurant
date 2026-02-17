import { useState } from 'react'
import {
  LayoutDashboard, Wallet, Receipt, PiggyBank, TrendingUp, FileBarChart, Settings,
  Menu, X, Bell, Download, ArrowUpRight, ArrowDownRight, DollarSign,
  CreditCard, Home, Utensils, Car, Film, Zap
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

/* ------------------------------------------------------------------ */
/*  MOCK DATA                                                          */
/* ------------------------------------------------------------------ */

const sidebarLinks = [
  { icon: LayoutDashboard, label: 'Overview', href: '#', active: true },
  { icon: Wallet, label: 'Portfolio', href: '#portfolio' },
  { icon: Receipt, label: 'Transactions', href: '#transactions' },
  { icon: PiggyBank, label: 'Budget', href: '#budget' },
  { icon: TrendingUp, label: 'Investments', href: '#investments' },
  { icon: FileBarChart, label: 'Reports', href: '#' },
  { icon: Settings, label: 'Settings', href: '#' },
]

const kpis = [
  { label: 'Net Worth', value: '$284,520', change: '+8.3%', trend: 'up', icon: Wallet, sparkline: [240, 248, 252, 255, 258, 262, 265, 268, 272, 276, 280, 284] },
  { label: 'Monthly Income', value: '$12,450', change: '+3.2%', trend: 'up', icon: DollarSign, sparkline: [11.2, 11.5, 11.8, 12.0, 11.9, 12.1, 12.2, 12.3, 12.35, 12.4, 12.45, 12.45] },
  { label: 'Monthly Expenses', value: '$8,230', change: '-5.1%', trend: 'down', icon: CreditCard, sparkline: [9.2, 8.9, 8.7, 8.5, 8.4, 8.3, 8.35, 8.3, 8.25, 8.2, 8.22, 8.23] },
  { label: 'Savings Rate', value: '33.9%', change: '+2.4%', trend: 'up', icon: PiggyBank, sparkline: [28, 29, 30, 31, 31.5, 32, 32.5, 33, 33.2, 33.5, 33.7, 33.9] },
]

const portfolioAllocation = [
  { name: 'Stocks', amount: '$142,260', percent: 50, color: 'bg-blue-500' },
  { name: 'Bonds', amount: '$56,904', percent: 20, color: 'bg-emerald-500' },
  { name: 'Real Estate', amount: '$42,678', percent: 15, color: 'bg-violet-500' },
  { name: 'Crypto', amount: '$28,452', percent: 10, color: 'bg-amber-500' },
  { name: 'Cash', amount: '$14,226', percent: 5, color: 'bg-slate-500' },
]

const budgetCategories = [
  { name: 'Housing', spent: 2200, limit: 2200, icon: Home },
  { name: 'Food', spent: 680, limit: 800, icon: Utensils },
  { name: 'Transport', spent: 320, limit: 400, icon: Car },
  { name: 'Entertainment', spent: 180, limit: 300, icon: Film },
  { name: 'Utilities', spent: 250, limit: 250, icon: Zap },
]

const investments = [
  { name: 'S&P 500 ETF', change: '+18.2%', value: '$45,200', trend: 'up' },
  { name: 'Tech Growth Fund', change: '+24.5%', value: '$32,800', trend: 'up' },
  { name: 'Bond Index', change: '-2.1%', value: '$28,400', trend: 'down' },
]

const recentTransactions = [
  { date: 'Feb 17', description: 'Salary Deposit', category: 'Income', amount: '+$6,225', isIncome: true, balance: '$18,450' },
  { date: 'Feb 16', description: 'Whole Foods', category: 'Groceries', amount: '-$142.50', isIncome: false, balance: '$12,225' },
  { date: 'Feb 15', description: 'Netflix', category: 'Entertainment', amount: '-$15.99', isIncome: false, balance: '$12,367' },
  { date: 'Feb 14', description: 'Uber', category: 'Transport', amount: '-$24.80', isIncome: false, balance: '$12,383' },
  { date: 'Feb 13', description: 'Freelance Payment', category: 'Income', amount: '+$2,500', isIncome: true, balance: '$12,408' },
  { date: 'Feb 12', description: 'Electric Bill', category: 'Utilities', amount: '-$89.00', isIncome: false, balance: '$9,908' },
]

const cashFlowData = [
  { month: 'Sep', income: 11.2, expenses: 8.5 },
  { month: 'Oct', income: 11.8, expenses: 8.7 },
  { month: 'Nov', income: 12.0, expenses: 8.4 },
  { month: 'Dec', income: 12.2, expenses: 8.6 },
  { month: 'Jan', income: 12.4, expenses: 8.3 },
  { month: 'Feb', income: 12.45, expenses: 8.23 },
]

const timeRanges = ['Today', '7 Days', '30 Days', '90 Days', 'Year']

/* ------------------------------------------------------------------ */
/*  SPARKLINE                                                          */
/* ------------------------------------------------------------------ */

function Sparkline({ data, color = 'text-teal-500', height = 32 }) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const w = 100
  const points = data.map((v, i) => `${(i / (data.length - 1)) * w},${height - ((v - min) / range) * height}`).join(' ')

  return (
    <svg viewBox={`0 0 ${w} ${height}`} className={`w-full h-8 ${color}`} preserveAspectRatio="none">
      <polyline fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" points={points} />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/*  APP                                                                */
/* ------------------------------------------------------------------ */

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedRange, setSelectedRange] = useState('30 Days')

  const maxCashFlow = Math.max(...cashFlowData.flatMap((d) => [d.income, d.expenses]))

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans">

      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-full w-60 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 z-40 transform transition-transform lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center">
              <Wallet className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold font-display">Finance</span>
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
                  ? 'bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-400'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Icon className="w-4.5 h-4.5" />
              <span className="flex-1">{label}</span>
            </a>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <div className="lg:pl-60">
        {/* Header */}
        <header className="sticky top-0 h-14 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 z-30">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 text-slate-600 dark:text-slate-400">
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden sm:flex items-center gap-1 bg-slate-100 dark:bg-slate-800 rounded-lg p-0.5">
              {timeRanges.map((range) => (
                <button
                  key={range}
                  onClick={() => setSelectedRange(range)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                    selectedRange === range
                      ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                      : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="text-xs hidden sm:flex">
              <Download className="w-3.5 h-3.5 mr-1" /> Export
            </Button>
            <button className="relative p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="p-6 space-y-6">
          <div>
            <h1 className="text-2xl font-bold font-display">Finance Dashboard</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Your financial overview · Last updated Feb 17, 2026</p>
          </div>

          {/* KPI Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {kpis.map(({ label, value, change, trend, icon: Icon, sparkline }) => (
              <Card key={label} className="border-slate-200 dark:border-slate-800 hover:shadow-md transition-shadow">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-slate-500 dark:text-slate-400">{label}</span>
                    <div className="w-9 h-9 rounded-lg bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                    </div>
                  </div>
                  <p className="text-2xl font-bold font-display mb-1">{value}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {trend === 'up' ? (
                        <ArrowUpRight className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4 text-red-500" />
                      )}
                      <span className={`text-sm font-medium ${trend === 'up' ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                        {change}
                      </span>
                    </div>
                    <div className="w-20">
                      <Sparkline
                        data={sparkline}
                        color={trend === 'up' ? 'text-teal-500' : 'text-red-500'}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Portfolio Allocation */}
            <div id="portfolio" className="lg:col-span-2">
              <Card className="border-slate-200 dark:border-slate-800">
                <CardHeader>
                  <CardTitle className="font-display">Portfolio Allocation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {portfolioAllocation.map((item) => (
                      <div key={item.name} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium">{item.name}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-slate-500 dark:text-slate-400">{item.amount}</span>
                            <span className="font-semibold">{item.percent}%</span>
                          </div>
                        </div>
                        <div className="h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${item.color} transition-all`}
                            style={{ width: `${item.percent}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Monthly Budget */}
              <Card id="budget" className="border-slate-200 dark:border-slate-800">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-display">Monthly Budget</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {budgetCategories.map(({ name, spent, limit, icon: Icon }) => {
                      const pct = Math.round((spent / limit) * 100)
                      return (
                        <div key={name} className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                              <Icon className="w-3.5 h-3.5 text-slate-400" />
                              <span className="font-medium">{name}</span>
                            </div>
                            <span className="text-slate-500 dark:text-slate-400">
                              ${spent.toLocaleString()}/${limit.toLocaleString()} · {pct}%
                            </span>
                          </div>
                          <div className="h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all ${
                                pct >= 100 ? 'bg-red-500' : pct >= 80 ? 'bg-amber-500' : 'bg-teal-500'
                              }`}
                              style={{ width: `${Math.min(pct, 100)}%` }}
                            />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Investment Performance */}
              <Card id="investments" className="border-slate-200 dark:border-slate-800">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-display">Investment Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {investments.map((inv) => (
                      <div key={inv.name} className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800/50 last:border-0">
                        <div>
                          <p className="text-sm font-medium">{inv.name}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">{inv.value}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          {inv.trend === 'up' ? (
                            <ArrowUpRight className="w-4 h-4 text-emerald-500" />
                          ) : (
                            <ArrowDownRight className="w-4 h-4 text-red-500" />
                          )}
                          <span className={`text-sm font-semibold ${inv.trend === 'up' ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                            {inv.change}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Recent Transactions */}
          <Card id="transactions" className="border-slate-200 dark:border-slate-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="font-display">Recent Transactions</CardTitle>
                <Button variant="outline" size="sm" className="text-xs">View All</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800">
                      <th className="text-left py-3 px-2 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Date</th>
                      <th className="text-left py-3 px-2 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Description</th>
                      <th className="text-left py-3 px-2 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider hidden sm:table-cell">Category</th>
                      <th className="text-right py-3 px-2 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Amount</th>
                      <th className="text-right py-3 px-2 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider hidden md:table-cell">Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentTransactions.map((txn, i) => (
                      <tr key={i} className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                        <td className="py-3 px-2 text-slate-500 dark:text-slate-400">{txn.date}</td>
                        <td className="py-3 px-2 font-medium">{txn.description}</td>
                        <td className="py-3 px-2 text-slate-500 dark:text-slate-400 hidden sm:table-cell">{txn.category}</td>
                        <td className={`py-3 px-2 text-right font-medium ${txn.isIncome ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                          {txn.amount}
                        </td>
                        <td className="py-3 px-2 text-right text-slate-500 dark:text-slate-400 hidden md:table-cell">{txn.balance}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Cash Flow Chart */}
          <Card className="border-slate-200 dark:border-slate-800">
            <CardHeader>
              <CardTitle className="font-display">Cash Flow</CardTitle>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Income vs expenses (last 6 months, $K)</p>
            </CardHeader>
            <CardContent>
              <div className="flex items-end gap-2 sm:gap-4 h-40">
                {cashFlowData.map((d) => (
                  <div key={d.month} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full flex gap-0.5 sm:gap-1 justify-center items-end h-28">
                      <div
                        className="flex-1 min-w-[4px] bg-teal-500 dark:bg-teal-600 rounded-t transition-all"
                        style={{ height: `${(d.income / maxCashFlow) * 100}%` }}
                      />
                      <div
                        className="flex-1 min-w-[4px] bg-red-400 dark:bg-red-600 rounded-t transition-all"
                        style={{ height: `${(d.expenses / maxCashFlow) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">{d.month}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-sm bg-teal-500" />
                  <span className="text-xs text-slate-500 dark:text-slate-400">Income</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-sm bg-red-400 dark:bg-red-600" />
                  <span className="text-xs text-slate-500 dark:text-slate-400">Expenses</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  )
}

export default App
