import { useState } from 'react'
import {
  LayoutDashboard, GitBranch, Users, Handshake, Contact, TrendingUp, BarChart3, Settings,
  Menu, X, Bell, Plus, ArrowUpRight, ArrowDownRight, Target, DollarSign, Trophy,
  Move, Mail, FileText, CheckCircle2, Calendar
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

/* ------------------------------------------------------------------ */
/*  MOCK DATA                                                          */
/* ------------------------------------------------------------------ */

const sidebarLinks = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '#', active: true },
  { icon: GitBranch, label: 'Pipeline', href: '#' },
  { icon: Users, label: 'Leads', href: '#' },
  { icon: Handshake, label: 'Deals', href: '#' },
  { icon: Contact, label: 'Contacts', href: '#' },
  { icon: TrendingUp, label: 'Forecast', href: '#' },
  { icon: BarChart3, label: 'Reports', href: '#' },
  { icon: Settings, label: 'Settings', href: '#' },
]

const pipelineStages = ['All', 'Prospecting', 'Qualification', 'Proposal', 'Negotiation', 'Closed']

const kpiCards = [
  { label: 'Total Pipeline', value: '$1.2M', change: '+15.3%', trend: 'up', icon: DollarSign },
  { label: 'Deals Won', value: '24 this month', change: '+8', trend: 'up', icon: Trophy },
  { label: 'Win Rate', value: '34.2%', change: '+2.1%', trend: 'up', icon: Target },
  { label: 'Avg Deal Size', value: '$18,500', change: '+$2,300', trend: 'up', icon: TrendingUp },
]

const pipelineColumns = [
  {
    stage: 'Prospecting',
    dealCount: 12,
    value: '$180K',
    borderColor: 'border-blue-500',
    dealCards: [
      { company: 'TechStart Inc', value: '$45,000', contact: 'John Smith' },
      { company: 'CloudBase Ltd', value: '$32,000', contact: 'Sarah Lee' },
    ],
  },
  {
    stage: 'Qualification',
    dealCount: 8,
    value: '$240K',
    borderColor: 'border-amber-500',
    dealCards: [
      { company: 'DataFlow Systems', value: '$65,000', contact: 'Mike Chen' },
      { company: 'InnovateCo', value: '$28,000', contact: 'Emma Davis' },
    ],
  },
  {
    stage: 'Proposal',
    dealCount: 6,
    value: '$320K',
    borderColor: 'border-purple-500',
    dealCards: [
      { company: 'Global Media', value: '$120,000', contact: 'James Wilson' },
      { company: 'Acme Corp', value: '$85,000', contact: 'Lisa Park' },
    ],
  },
  {
    stage: 'Negotiation',
    dealCount: 4,
    value: '$280K',
    borderColor: 'border-orange-500',
    dealCards: [
      { company: 'Enterprise Solutions', value: '$95,000', contact: 'David Brown' },
      { company: 'NextGen Tech', value: '$72,000', contact: 'Anna Martinez' },
    ],
  },
  {
    stage: 'Closed Won',
    dealCount: 3,
    value: '$180K',
    borderColor: 'border-emerald-500',
    dealCards: [
      { company: 'Digital First', value: '$55,000', contact: 'Chris Taylor' },
      { company: 'Smart Systems', value: '$48,000', contact: 'Rachel Green' },
    ],
  },
]

const teamLeaderboard = [
  { rank: 1, name: 'Sarah Chen', revenue: '$142,500', deals: 8 },
  { rank: 2, name: 'Mike Johnson', revenue: '$128,300', deals: 6 },
  { rank: 3, name: 'Lisa Park', revenue: '$98,700', deals: 7 },
  { rank: 4, name: 'James Wilson', revenue: '$87,200', deals: 5 },
  { rank: 5, name: 'Emma Davis', revenue: '$76,400', deals: 4 },
]

const revenueForecast = [
  { month: 'Feb', current: 180000, target: 200000, projected: false },
  { month: 'Mar', current: 150000, target: 220000, projected: false },
  { month: 'Apr', current: 240000, target: 240000, projected: true },
]

const recentActivity = [
  { icon: Move, text: 'Deal "Acme Corp" moved to Negotiation', time: '2h ago' },
  { icon: Users, text: 'New lead "TechStart Inc" added', time: '3h ago' },
  { icon: FileText, text: 'Proposal sent to "Global Media"', time: '5h ago' },
  { icon: CheckCircle2, text: 'Deal "DataFlow" closed won - $45,000', time: 'Yesterday' },
  { icon: Calendar, text: 'Meeting scheduled with "CloudBase"', time: 'Yesterday' },
  { icon: Mail, text: 'Follow-up email sent to "InnovateCo"', time: '2 days ago' },
]

const topDeals = [
  { dealName: 'Enterprise Platform', company: 'Global Media', value: '$120,000', stage: 'Proposal', probability: 75, closeDate: 'Feb 28, 2026' },
  { dealName: 'Cloud Migration', company: 'Acme Corp', value: '$85,000', stage: 'Negotiation', probability: 90, closeDate: 'Feb 25, 2026' },
  { dealName: 'Data Analytics Suite', company: 'Enterprise Solutions', value: '$95,000', stage: 'Negotiation', probability: 85, closeDate: 'Mar 5, 2026' },
  { dealName: 'API Integration', company: 'NextGen Tech', value: '$72,000', stage: 'Proposal', probability: 60, closeDate: 'Mar 12, 2026' },
  { dealName: 'Security Upgrade', company: 'Digital First', value: '$55,000', stage: 'Closed Won', probability: 100, closeDate: 'Feb 17, 2026' },
]

/* ------------------------------------------------------------------ */
/*  APP                                                                */
/* ------------------------------------------------------------------ */

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedStage, setSelectedStage] = useState('All')

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans">

      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-full w-60 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 z-40 transform transition-transform lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
              <Handshake className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold font-display">Sales</span>
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
                  ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400'
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
        <header className="sticky top-0 h-14 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 sm:px-6 z-30">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 rounded-lg p-0.5 overflow-x-auto">
              {pipelineStages.map((stage) => (
                <button
                  key={stage}
                  onClick={() => setSelectedStage(stage)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-all ${
                    selectedStage === stage
                      ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                      : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                  }`}
                >
                  {stage}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg shadow-green-500/25">
              <Plus className="w-4 h-4 mr-2" /> Add Deal
            </Button>
            <button className="relative p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full" />
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="p-4 sm:p-6 space-y-6">
          <div>
            <h1 className="text-2xl font-bold font-display">Sales Pipeline</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Track deals and forecast revenue</p>
          </div>

          {/* KPI Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {kpiCards.map(({ label, value, change, trend, icon: Icon }) => (
              <Card key={label} className="border-slate-200 dark:border-slate-800 hover:shadow-md transition-shadow">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-slate-500 dark:text-slate-400">{label}</span>
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-green-500/20 to-emerald-600/20 dark:from-green-500/30 dark:to-emerald-600/30 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-green-600 dark:text-green-400" />
                    </div>
                  </div>
                  <p className="text-2xl font-bold font-display mb-1">{value}</p>
                  <div className="flex items-center gap-1">
                    {trend === 'up' ? <ArrowUpRight className="w-4 h-4 text-emerald-500" /> : <ArrowDownRight className="w-4 h-4 text-red-500" />}
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400">{change}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Pipeline Board */}
            <div className="lg:col-span-2">
              <Card className="border-slate-200 dark:border-slate-800">
                <CardHeader>
                  <CardTitle className="font-display flex items-center gap-2">
                    <GitBranch className="w-5 h-5 text-green-500" />
                    Pipeline Board
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4 overflow-x-auto pb-2 -mx-1">
                    {pipelineColumns.map((col) => (
                      <div
                        key={col.stage}
                        className="min-w-[200px] sm:min-w-[220px] flex-shrink-0"
                      >
                        <div className={`rounded-t-lg border-t-4 ${col.borderColor} bg-slate-50 dark:bg-slate-800/50 p-3`}>
                          <h4 className="font-semibold text-sm text-slate-900 dark:text-white">{col.stage}</h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                            {col.dealCount} deals · {col.value}
                          </p>
                        </div>
                        <div className="space-y-2 mt-2">
                          {col.dealCards.map((deal) => (
                            <div
                              key={deal.company}
                              className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow"
                            >
                              <p className="font-medium text-sm">{deal.company}</p>
                              <p className="text-green-600 dark:text-green-400 font-semibold text-sm mt-1">{deal.value}</p>
                              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{deal.contact}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Team Leaderboard */}
              <Card className="border-slate-200 dark:border-slate-800">
                <CardHeader>
                  <CardTitle className="font-display text-base flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-green-500" />
                    Team Leaderboard
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {teamLeaderboard.map((rep) => (
                      <div
                        key={rep.name}
                        className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                      >
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          rep.rank === 1 ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400' :
                          rep.rank === 2 ? 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300' :
                          rep.rank === 3 ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400' :
                          'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                        }`}>
                          {rep.rank}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{rep.name}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">{rep.deals} deals</p>
                        </div>
                        <span className="font-semibold text-green-600 dark:text-green-400 text-sm">{rep.revenue}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Revenue Forecast */}
              <Card className="border-slate-200 dark:border-slate-800">
                <CardHeader>
                  <CardTitle className="font-display text-base flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    Revenue Forecast
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {revenueForecast.map((item) => {
                      const pct = Math.min(100, Math.round((item.current / item.target) * 100))
                      return (
                        <div key={item.month}>
                          <div className="flex items-center justify-between text-sm mb-1.5">
                            <span className="font-medium">{item.month}</span>
                            <span className="text-slate-500 dark:text-slate-400">
                              {item.projected ? `Projected $${(item.current / 1000).toFixed(0)}K` : `$${(item.current / 1000).toFixed(0)}K of $${(item.target / 1000).toFixed(0)}K`}
                            </span>
                          </div>
                          <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-green-500 to-emerald-600 transition-all"
                              style={{ width: `${item.projected ? 100 : pct}%` }}
                            />
                          </div>
                          {!item.projected && (
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{pct}%</p>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Recent Activity */}
            <Card className="border-slate-200 dark:border-slate-800">
              <CardHeader>
                <CardTitle className="font-display text-base flex items-center gap-2">
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-0">
                  {recentActivity.map((item, i) => {
                    const Icon = item.icon
                    return (
                      <div
                        key={i}
                        className={`flex gap-3 py-3 ${i < recentActivity.length - 1 ? 'border-b border-slate-100 dark:border-slate-800' : ''}`}
                      >
                        <div className="w-8 h-8 rounded-lg bg-green-50 dark:bg-green-900/20 flex items-center justify-center shrink-0">
                          <Icon className="w-4 h-4 text-green-600 dark:text-green-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-slate-900 dark:text-slate-100">{item.text}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{item.time}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Top Deals Table */}
            <div className="lg:col-span-2">
              <Card className="border-slate-200 dark:border-slate-800">
                <CardHeader>
                  <CardTitle className="font-display text-base">Top Deals</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-slate-200 dark:border-slate-800">
                          <th className="text-left py-3 px-2 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Deal Name</th>
                          <th className="text-left py-3 px-2 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider hidden sm:table-cell">Company</th>
                          <th className="text-right py-3 px-2 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Value</th>
                          <th className="text-left py-3 px-2 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider hidden md:table-cell">Stage</th>
                          <th className="text-right py-3 px-2 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider hidden md:table-cell">Probability</th>
                          <th className="text-left py-3 px-2 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider hidden lg:table-cell">Close Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {topDeals.map((deal) => (
                          <tr key={deal.dealName} className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                            <td className="py-3 px-2 font-medium">{deal.dealName}</td>
                            <td className="py-3 px-2 text-slate-600 dark:text-slate-400 hidden sm:table-cell">{deal.company}</td>
                            <td className="py-3 px-2 text-right font-semibold text-green-600 dark:text-green-400">{deal.value}</td>
                            <td className="py-3 px-2 hidden md:table-cell">{deal.stage}</td>
                            <td className="py-3 px-2 text-right hidden md:table-cell">{deal.probability}%</td>
                            <td className="py-3 px-2 text-slate-500 dark:text-slate-400 hidden lg:table-cell">{deal.closeDate}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} aria-hidden="true" />
      )}
    </div>
  )
}

export default App
