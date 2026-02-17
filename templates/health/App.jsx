import { useState } from 'react'
import {
  HeartPulse, Thermometer, Activity, Moon, Pill, Footprints, Flame, Clock, Bell, Search,
  Settings, Menu, X, TrendingUp, TrendingDown, CheckCircle2, AlertCircle, Calendar, User,
  Shield, Eye, Droplets, Brain, Zap, LayoutDashboard, FileText
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const sidebarLinks = [
  { icon: LayoutDashboard, label: 'Overview', href: '#', active: true },
  { icon: HeartPulse, label: 'Vitals', href: '#vitals' },
  { icon: Pill, label: 'Medications', href: '#medications' },
  { icon: Moon, label: 'Sleep', href: '#sleep' },
  { icon: Activity, label: 'Activity', href: '#activity' },
  { icon: FileText, label: 'Reports', href: '#reports' },
  { icon: Settings, label: 'Settings', href: '#' },
]

const kpiCards = [
  { label: 'Heart Rate', value: '72 bpm', sublabel: 'Resting', icon: HeartPulse, status: 'normal', statusLabel: 'Normal' },
  { label: 'Blood Pressure', value: '120/80', sublabel: 'mmHg', icon: Droplets, status: 'normal', statusLabel: 'Normal' },
  { label: 'SpO2', value: '98%', sublabel: 'Oxygen', icon: Activity, status: 'normal', statusLabel: 'Excellent' },
  { label: 'Body Temp', value: '98.6°F', sublabel: 'Temperature', icon: Thermometer, status: 'normal', statusLabel: 'Normal' },
]

const sleepData = {
  duration: '7h 42m',
  deepSleep: '1h 52m',
  rem: '2h 10m',
  score: 82,
  lightSleep: '3h 40m',
}

const medications = [
  { name: 'Vitamin D', time: '8:00 AM', status: 'taken', icon: CheckCircle2 },
  { name: 'Omega-3', time: '12:00 PM', status: 'upcoming', icon: Clock },
  { name: 'Melatonin', time: '10:00 PM', status: 'pending', icon: Clock },
]

const activityData = {
  steps: { current: 8432, goal: 10000 },
  activeMinutes: { current: 45, goal: 60 },
  caloriesBurned: 420,
}

const vitalsLog = [
  { date: 'Feb 17, 2026', heartRate: 72, bloodPressure: '120/80', weight: '165 lbs', notes: 'Morning reading' },
  { date: 'Feb 16, 2026', heartRate: 74, bloodPressure: '118/78', weight: '165 lbs', notes: 'After workout' },
  { date: 'Feb 15, 2026', heartRate: 71, bloodPressure: '122/82', weight: '166 lbs', notes: '' },
  { date: 'Feb 14, 2026', heartRate: 73, bloodPressure: '119/79', weight: '166 lbs', notes: 'Rest day' },
  { date: 'Feb 13, 2026', heartRate: 75, bloodPressure: '121/80', weight: '165 lbs', notes: 'Evening check' },
]

const dateRanges = ['Today', '7 Days', '30 Days', '90 Days']

/* ------------------------------------------------------------------ */
/*  APP                                                                */
/* ------------------------------------------------------------------ */

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedRange, setSelectedRange] = useState('7 Days')

  const statusIndicatorColors = {
    normal: 'bg-emerald-500',
    warning: 'bg-amber-500',
    alert: 'bg-red-500',
  }

  const medicationStatusStyles = {
    taken: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400',
    upcoming: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400',
    pending: 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400',
  }

  const sleepScorePercent = sleepData.score

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans">

      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-full w-60 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 z-40 transform transition-transform lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center">
              <HeartPulse className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold font-display">Health</span>
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
                  ? 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400'
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
              {dateRanges.map((range) => (
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
            <button className="relative p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-700">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center text-white text-sm font-bold">
                <User className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium hidden sm:inline">Profile</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-6 space-y-6">
          <div>
            <h1 className="text-2xl font-bold font-display">Health Dashboard</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Your health overview for {selectedRange}</p>
          </div>

          {/* Health Score Card */}
          <Card className="border-slate-200 dark:border-slate-800 overflow-hidden">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="relative shrink-0">
                  <svg className="w-32 h-32 -rotate-90" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      className="text-slate-200 dark:text-slate-700"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="url(#healthGradient)"
                      strokeWidth="2.5"
                      strokeDasharray={`${87}, 100`}
                      strokeLinecap="round"
                      className="transition-all duration-500"
                    />
                    <defs>
                      <linearGradient id="healthGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#ef4444" />
                        <stop offset="100%" stopColor="#e11d48" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold font-display">87</span>
                    <span className="text-xs text-slate-500">/100</span>
                  </div>
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-lg font-semibold font-display">Health Score</h3>
                  <p className="text-emerald-600 dark:text-emerald-400 font-medium flex items-center justify-center sm:justify-start gap-1 mt-1">
                    <TrendingUp className="w-4 h-4" />
                    Good — up 3 from last week
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                    Your overall health is in good shape. Keep up your sleep routine and stay active.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* KPI Cards */}
          <div id="vitals" className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {kpiCards.map(({ label, value, sublabel, icon: Icon, status, statusLabel }) => (
              <Card key={label} className="border-slate-200 dark:border-slate-800 hover:shadow-md transition-shadow">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-slate-500 dark:text-slate-400">{label}</span>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${statusIndicatorColors[status]}`} />
                      <span className="text-xs font-medium text-slate-500">{statusLabel}</span>
                    </div>
                  </div>
                  <p className="text-2xl font-bold font-display">{value}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{sublabel}</p>
                  <div className="mt-3 w-9 h-9 rounded-lg bg-red-50 dark:bg-red-900/20 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-red-600 dark:text-red-400" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Sleep Analysis */}
            <div id="sleep" className="lg:col-span-2">
              <Card className="border-slate-200 dark:border-slate-800">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="font-display flex items-center gap-2">
                      <Moon className="w-5 h-5 text-red-500" />
                      Sleep Analysis
                    </CardTitle>
                    <span className="text-xs text-slate-500">Last night</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Duration</p>
                      <p className="text-lg font-bold font-display">{sleepData.duration}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Deep Sleep</p>
                      <p className="text-lg font-bold font-display">{sleepData.deepSleep}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">REM</p>
                      <p className="text-lg font-bold font-display">{sleepData.rem}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Sleep Score</p>
                      <p className="text-lg font-bold font-display">{sleepData.score}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span>Light</span>
                      <span>Deep</span>
                      <span>REM</span>
                    </div>
                    <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex">
                      <div className="bg-slate-300 dark:bg-slate-600" style={{ width: '48%' }} />
                      <div className="bg-red-400 dark:bg-red-600" style={{ width: '24%' }} />
                      <div className="bg-rose-500 dark:bg-rose-600" style={{ width: '28%' }} />
                    </div>
                    <div className="flex justify-between text-xs text-slate-500">
                      <span>{sleepData.lightSleep}</span>
                      <span>{sleepData.deepSleep}</span>
                      <span>{sleepData.rem}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Medication Tracker */}
            <div id="medications">
              <Card className="border-slate-200 dark:border-slate-800">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="font-display flex items-center gap-2">
                      <Pill className="w-5 h-5 text-red-500" />
                      Medication Tracker
                    </CardTitle>
                    <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">94% adherence</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {medications.map((med) => {
                      const StatusIcon = med.icon
                      return (
                        <div
                          key={med.name}
                          className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-lg bg-red-50 dark:bg-red-900/20 flex items-center justify-center">
                              <Pill className="w-4 h-4 text-red-600 dark:text-red-400" />
                            </div>
                            <div>
                              <p className="font-medium text-sm">{med.name}</p>
                              <p className="text-xs text-slate-500 dark:text-slate-400">{med.time}</p>
                            </div>
                          </div>
                          <span className={`px-2.5 py-1 text-xs font-medium rounded-full capitalize ${medicationStatusStyles[med.status]}`}>
                            {med.status === 'taken' && <CheckCircle2 className="w-3 h-3 inline mr-1 -mt-0.5" />}
                            {med.status}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Activity Summary */}
          <div id="activity">
            <Card className="border-slate-200 dark:border-slate-800">
              <CardHeader>
                <CardTitle className="font-display flex items-center gap-2">
                  <Activity className="w-5 h-5 text-red-500" />
                  Activity Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-3 gap-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Footprints className="w-4 h-4 text-red-500" />
                      <span className="text-sm font-medium">Steps</span>
                    </div>
                    <p className="text-2xl font-bold font-display">
                      {activityData.steps.current.toLocaleString()} <span className="text-slate-500 text-base font-normal">/ {activityData.steps.goal.toLocaleString()}</span>
                    </p>
                    <div className="mt-2 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-red-500 to-rose-600 rounded-full transition-all"
                        style={{ width: `${Math.min(100, (activityData.steps.current / activityData.steps.goal) * 100)}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="w-4 h-4 text-red-500" />
                      <span className="text-sm font-medium">Active Minutes</span>
                    </div>
                    <p className="text-2xl font-bold font-display">
                      {activityData.activeMinutes.current} <span className="text-slate-500 text-base font-normal">/ {activityData.activeMinutes.goal}</span>
                    </p>
                    <div className="mt-2 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-red-500 to-rose-600 rounded-full transition-all"
                        style={{ width: `${(activityData.activeMinutes.current / activityData.activeMinutes.goal) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Flame className="w-4 h-4 text-red-500" />
                      <span className="text-sm font-medium">Calories Burned</span>
                    </div>
                    <p className="text-2xl font-bold font-display">{activityData.caloriesBurned}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">kcal today</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Vitals Log */}
          <Card id="reports" className="border-slate-200 dark:border-slate-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="font-display">Recent Vitals Log</CardTitle>
                <Button variant="outline" size="sm" className="text-xs bg-gradient-to-r from-red-500 to-rose-600 text-white border-0 hover:from-red-600 hover:to-rose-700">
                  <Eye className="w-3.5 h-3.5 mr-1" /> View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800">
                      <th className="text-left py-3 px-2 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Date</th>
                      <th className="text-right py-3 px-2 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Heart Rate</th>
                      <th className="text-right py-3 px-2 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Blood Pressure</th>
                      <th className="text-right py-3 px-2 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider hidden sm:table-cell">Weight</th>
                      <th className="text-left py-3 px-2 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider hidden md:table-cell">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vitalsLog.map((log, i) => (
                      <tr key={i} className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                        <td className="py-3 px-2 font-medium">{log.date}</td>
                        <td className="py-3 px-2 text-right">{log.heartRate} bpm</td>
                        <td className="py-3 px-2 text-right">{log.bloodPressure}</td>
                        <td className="py-3 px-2 text-right text-slate-500 dark:text-slate-400 hidden sm:table-cell">{log.weight}</td>
                        <td className="py-3 px-2 text-slate-500 dark:text-slate-400 hidden md:table-cell">{log.notes || '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
