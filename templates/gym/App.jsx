import { useState, useEffect } from 'react'
import {
  Dumbbell, Timer, Trophy, Flame, TrendingUp, Target, Calendar, Clock,
  Plus, Menu, X, Bell, Search, Settings, ChevronDown, Play, Pause,
  CheckCircle2, Circle, Zap, BarChart3, ArrowUpRight, ArrowDownRight,
  Weight, Repeat, Heart
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

/* ------------------------------------------------------------------ */
/*  MOCK DATA                                                          */
/* ------------------------------------------------------------------ */

const sidebarLinks = [
  { icon: BarChart3, label: 'Overview', href: '#', active: true },
  { icon: Dumbbell, label: 'Workouts', href: '#' },
  { icon: Target, label: 'Exercises', href: '#' },
  { icon: Repeat, label: 'Routines', href: '#' },
  { icon: TrendingUp, label: 'Progress', href: '#' },
  { icon: Weight, label: 'Body Stats', href: '#' },
  { icon: Settings, label: 'Settings', href: '#' },
]

const kpis = [
  { label: 'Workouts This Week', value: '4/5', change: '+1 vs last week', trend: 'up', icon: Dumbbell },
  { label: 'Total Volume', value: '24,500 lbs', change: '+8.2%', trend: 'up', icon: Zap },
  { label: 'Streak', value: '12 days', change: 'Keep it up!', trend: 'up', icon: Flame },
  { label: 'Personal Records', value: '3 this month', change: '+2', trend: 'up', icon: Trophy },
]

const todaysWorkout = {
  name: 'Push Day',
  exercises: [
    { name: 'Bench Press', sets: '4x8', weight: '185 lbs', status: 'completed' },
    { name: 'Incline Dumbbell Press', sets: '3x10', weight: '60 lbs', status: 'completed' },
    { name: 'Cable Flyes', sets: '3x12', weight: '30 lbs', status: 'in_progress' },
    { name: 'Overhead Press', sets: '4x8', weight: '95 lbs', status: 'pending' },
    { name: 'Lateral Raises', sets: '3x15', weight: '20 lbs', status: 'pending' },
  ],
}

const muscleGroupSplit = [
  { day: 'Mon', groups: 'Chest/Tri', active: false, icon: null },
  { day: 'Tue', groups: 'Back/Bi', active: false, icon: null },
  { day: 'Wed', groups: 'Legs', active: false, icon: null },
  { day: 'Thu', groups: 'Shoulders', active: true, icon: null },
  { day: 'Fri', groups: 'Full Body', active: false, icon: null },
  { day: 'Sat', groups: 'Cardio', active: false, icon: Heart },
  { day: 'Sun', groups: 'Rest', active: false, icon: null },
]

const personalRecords = [
  { exercise: 'Bench Press', weight: '225 lbs', date: 'Feb 14, 2026' },
  { exercise: 'Squat', weight: '315 lbs', date: 'Feb 10, 2026' },
  { exercise: 'Deadlift', weight: '365 lbs', date: 'Feb 8, 2026' },
]

const bodyStats = [
  { label: 'Weight', value: '178 lbs', trend: 'down', change: '-2 lbs' },
  { label: 'Body Fat', value: '14.2%', trend: 'down', change: '-0.5%' },
  { label: 'Muscle Mass', value: '145 lbs', trend: 'up', change: '+1.2 lbs' },
]

const recentWorkouts = [
  { date: 'Feb 17, 2026', name: 'Push Day', duration: '52 min', volume: '8,420 lbs', exercises: 5 },
  { date: 'Feb 16, 2026', name: 'Pull Day', duration: '48 min', volume: '7,890 lbs', exercises: 6 },
  { date: 'Feb 15, 2026', name: 'Leg Day', duration: '65 min', volume: '12,340 lbs', exercises: 7 },
  { date: 'Feb 14, 2026', name: 'Upper Body', duration: '55 min', volume: '9,120 lbs', exercises: 8 },
  { date: 'Feb 13, 2026', name: 'Cardio + Core', duration: '35 min', volume: '—', exercises: 4 },
]

/* ------------------------------------------------------------------ */
/*  APP                                                                */
/* ------------------------------------------------------------------ */

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [timerRunning, setTimerRunning] = useState(false)
  const [timerSeconds, setTimerSeconds] = useState(0)

  useEffect(() => {
    if (!timerRunning) return
    const id = setInterval(() => setTimerSeconds((s) => s + 1), 1000)
    return () => clearInterval(id)
  }, [timerRunning])

  const formatTimer = (sec) => {
    const m = Math.floor(sec / 60)
    const s = sec % 60
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  const getExerciseStatusIcon = (status) => {
    if (status === 'completed') return CheckCircle2
    if (status === 'in_progress') return Play
    return Circle
  }

  const getExerciseStatusColor = (status) => {
    if (status === 'completed') return 'text-emerald-500 dark:text-emerald-400'
    if (status === 'in_progress') return 'text-orange-500 dark:text-orange-400'
    return 'text-slate-400 dark:text-slate-500'
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans">

      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-full w-60 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 z-40 transform transition-transform lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center">
              <Dumbbell className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold font-display">FitTrack</span>
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
                  ? 'bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400'
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
            <div className="hidden sm:flex items-center gap-3">
              <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 rounded-lg px-3 py-2">
                <Timer className="w-4 h-4 text-slate-500" />
                <span className="font-mono text-sm font-medium">{formatTimer(timerSeconds)}</span>
                <button
                  onClick={() => setTimerRunning(!timerRunning)}
                  className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700"
                >
                  {timerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
              </div>
              <div className="hidden md:flex items-center gap-2 bg-slate-100 dark:bg-slate-800 rounded-lg px-3 py-2 w-48">
                <Search className="w-4 h-4 text-slate-500 shrink-0" />
                <Input placeholder="Search workouts..." className="border-0 bg-transparent h-auto p-0 text-sm focus-visible:ring-0" />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button className="bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white shadow-lg shadow-orange-500/25">
              <Plus className="w-4 h-4 mr-2" /> Start Workout
            </Button>
            <button className="relative p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-orange-500 rounded-full" />
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="p-4 sm:p-6 space-y-6">
          <div>
            <h1 className="text-2xl font-bold font-display">Overview</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Welcome back! Here's your fitness summary.</p>
          </div>

          {/* KPI Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {kpis.map(({ label, value, change, trend, icon: Icon }) => (
              <Card key={label} className="border-slate-200 dark:border-slate-800 hover:shadow-md transition-shadow">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-slate-500 dark:text-slate-400">{label}</span>
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-orange-500/20 to-amber-600/20 dark:from-orange-500/30 dark:to-amber-600/30 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-orange-600 dark:text-orange-400" />
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
            {/* Today's Workout */}
            <div className="lg:col-span-2">
              <Card className="border-slate-200 dark:border-slate-800">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="font-display flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-orange-500" />
                      Today's Workout
                    </CardTitle>
                    <Button variant="outline" size="sm" className="text-xs">
                      <Play className="w-3.5 h-3.5 mr-1" /> Start
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <h3 className="text-lg font-semibold mb-4 text-orange-600 dark:text-orange-400">{todaysWorkout.name}</h3>
                  <div className="space-y-3">
                    {todaysWorkout.exercises.map((ex) => {
                      const StatusIcon = getExerciseStatusIcon(ex.status)
                      return (
                        <div
                          key={ex.name}
                          className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        >
                          <StatusIcon className={`w-5 h-5 shrink-0 ${getExerciseStatusColor(ex.status)}`} />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium">{ex.name}</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                              {ex.sets} @ {ex.weight}
                            </p>
                          </div>
                          <span className={`text-xs font-medium px-2 py-1 rounded-full capitalize ${
                            ex.status === 'completed'
                              ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
                              : ex.status === 'in_progress'
                              ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                          }`}>
                            {ex.status.replace('_', ' ')}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Muscle Group Split */}
            <div>
              <Card className="border-slate-200 dark:border-slate-800">
                <CardHeader>
                  <CardTitle className="font-display text-base flex items-center gap-2">
                    <Target className="w-4 h-4 text-orange-500" />
                    Muscle Group Split
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {muscleGroupSplit.map(({ day, groups, active, icon: DayIcon }) => (
                      <div
                        key={day}
                        className={`flex items-center justify-between p-2.5 rounded-lg text-sm transition-colors ${
                          active
                            ? 'bg-gradient-to-r from-orange-500/20 to-amber-600/20 dark:from-orange-500/30 dark:to-amber-600/30 border border-orange-200 dark:border-orange-800'
                            : 'hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                      >
                        <span className={`font-medium ${active ? 'text-orange-700 dark:text-orange-400' : 'text-slate-700 dark:text-slate-300'}`}>
                          {day}
                        </span>
                        <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                          {DayIcon && <DayIcon className="w-3.5 h-3.5 text-orange-500" />}
                          {groups}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {/* Personal Records */}
            <Card className="border-slate-200 dark:border-slate-800">
              <CardHeader>
                <CardTitle className="font-display text-base flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-orange-500" />
                  Personal Records
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {personalRecords.map((pr) => (
                    <div key={pr.exercise} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                      <div>
                        <p className="font-medium">{pr.exercise}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{pr.date}</p>
                      </div>
                      <span className="font-bold text-orange-600 dark:text-orange-400">{pr.weight}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Body Stats */}
            <Card className="border-slate-200 dark:border-slate-800">
              <CardHeader>
                <CardTitle className="font-display text-base flex items-center gap-2">
                  <Weight className="w-4 h-4 text-orange-500" />
                  Body Stats
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bodyStats.map((stat) => (
                    <div key={stat.label} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                      <div>
                        <p className="font-medium">{stat.label}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{stat.change}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold">{stat.value}</span>
                        {stat.trend === 'up' ? (
                          <ArrowUpRight className="w-4 h-4 text-emerald-500" />
                        ) : (
                          <ArrowDownRight className="w-4 h-4 text-slate-400" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Workouts Table - Full Width */}
          <Card className="border-slate-200 dark:border-slate-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="font-display">Recent Workouts</CardTitle>
                <Button variant="outline" size="sm" className="text-xs">
                    View All <ChevronDown className="w-3.5 h-3.5 ml-1 rotate-[-90deg]" />
                  </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800">
                      <th className="text-left py-3 px-2 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Date</th>
                      <th className="text-left py-3 px-2 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Workout</th>
                      <th className="text-right py-3 px-2 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Duration</th>
                      <th className="text-right py-3 px-2 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider hidden sm:table-cell">Volume</th>
                      <th className="text-right py-3 px-2 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider hidden md:table-cell">Exercises</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentWorkouts.map((w, i) => (
                      <tr key={i} className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                        <td className="py-3 px-2 text-slate-600 dark:text-slate-400">{w.date}</td>
                        <td className="py-3 px-2 font-medium">{w.name}</td>
                        <td className="py-3 px-2 text-right">{w.duration}</td>
                        <td className="py-3 px-2 text-right hidden sm:table-cell">{w.volume}</td>
                        <td className="py-3 px-2 text-right hidden md:table-cell">{w.exercises}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} aria-hidden="true" />
      )}
    </div>
  )
}

export default App
