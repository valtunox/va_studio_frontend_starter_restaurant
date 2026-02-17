import { useState } from 'react'
import {
  Apple, Beef, Salad, Coffee, Droplets, Target, TrendingUp, Flame, Clock,
  Plus, Menu, X, Bell, Search, Settings, ChevronDown, MoreHorizontal,
  Calendar, UtensilsCrossed, Wheat, Fish, Egg, GlassWater
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

/* ------------------------------------------------------------------ */
/*  MOCK DATA                                                          */
/* ------------------------------------------------------------------ */

const sidebarLinks = [
  { icon: UtensilsCrossed, label: 'Overview', href: '#', active: true },
  { icon: Apple, label: 'Meal Log', href: '#meal-log' },
  { icon: Beef, label: 'Food Database', href: '#' },
  { icon: Salad, label: 'Recipes', href: '#' },
  { icon: Target, label: 'Goals', href: '#' },
  { icon: Settings, label: 'Settings', href: '#' },
]

const kpis = [
  { label: 'Calories', current: 1847, target: 2200, unit: '', icon: Flame },
  { label: 'Protein', current: 142, target: 160, unit: 'g', icon: Beef },
  { label: 'Carbs', current: 198, target: 250, unit: 'g', icon: Wheat },
  { label: 'Fat', current: 62, target: 70, unit: 'g', icon: Egg },
]

const todaysMeals = [
  { meal: 'Breakfast', time: '7:30 AM', items: 'Oatmeal with berries, Greek yogurt', calories: 420, icon: Coffee },
  { meal: 'Lunch', time: '12:15 PM', items: 'Grilled chicken salad, whole wheat bread', calories: 580, icon: Salad },
  { meal: 'Snack', time: '3:00 PM', items: 'Apple, almonds, protein bar', calories: 310, icon: Apple },
  { meal: 'Dinner', time: '7:00 PM', items: 'Salmon, brown rice, steamed broccoli', calories: 537, icon: Fish },
]

const macroBreakdown = [
  { name: 'Protein', value: 142, total: 568, percent: 31, color: 'bg-lime-500' },
  { name: 'Carbs', value: 198, total: 792, percent: 43, color: 'bg-green-500' },
  { name: 'Fat', value: 62, total: 558, percent: 26, color: 'bg-emerald-600' },
]

const waterGlasses = 8
const waterFilled = 6

const weeklyCalorieTrend = [
  { day: 'Mon', calories: 1950 },
  { day: 'Tue', calories: 2100 },
  { day: 'Wed', calories: 1880 },
  { day: 'Thu', calories: 2240 },
  { day: 'Fri', calories: 1980 },
  { day: 'Sat', calories: 2450 },
  { day: 'Sun', calories: 1847 },
]

const recentFoods = [
  { name: 'Chicken breast, grilled', calories: 165, protein: 31, carbs: 0, fat: 3.6 },
  { name: 'Brown rice, cooked', calories: 216, protein: 5, carbs: 45, fat: 1.8 },
  { name: 'Greek yogurt, plain', calories: 100, protein: 17, carbs: 6, fat: 0.7 },
  { name: 'Almonds', calories: 164, protein: 6, carbs: 6, fat: 14 },
  { name: 'Salmon, baked', calories: 206, protein: 22, carbs: 0, fat: 13 },
  { name: 'Broccoli, steamed', calories: 55, protein: 3.7, carbs: 11, fat: 0.6 },
]

/* ------------------------------------------------------------------ */
/*  APP                                                                */
/* ------------------------------------------------------------------ */

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState('2026-02-17')

  const maxWeeklyCal = Math.max(...weeklyCalorieTrend.map((d) => d.calories))

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans">

      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-full w-60 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 z-40 transform transition-transform lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-lime-500 to-green-600 flex items-center justify-center">
              <Apple className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold font-display">Nutrition</span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-1 text-slate-400">
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
                  ? 'bg-lime-50 dark:bg-lime-900/20 text-lime-700 dark:text-lime-400'
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
          <div className="flex items-center gap-3 sm:gap-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 text-slate-600 dark:text-slate-400">
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 rounded-lg px-3 py-2">
              <Calendar className="w-4 h-4 text-slate-500 dark:text-slate-400" />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="bg-transparent text-sm font-medium text-slate-900 dark:text-slate-100 border-none outline-none focus:ring-0"
              />
              <ChevronDown className="w-4 h-4 text-slate-500 dark:text-slate-400" />
            </div>
            <Button className="bg-gradient-to-r from-lime-500 to-green-600 hover:from-lime-600 hover:to-green-700 text-white shadow-lg shadow-lime-500/25">
              <Plus className="w-4 h-4 mr-2" /> Quick Add Meal
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <button className="hidden sm:flex p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
              <Search className="w-5 h-5" />
            </button>
            <button className="relative p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-lime-500 rounded-full" />
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="p-4 sm:p-6 space-y-6">
          <div>
            <h1 className="text-2xl font-bold font-display">Today&apos;s Overview</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Track your nutrition and stay on target</p>
          </div>

          {/* KPI Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {kpis.map(({ label, current, target, unit, icon: Icon }) => {
              const pct = Math.min(100, Math.round((current / target) * 100))
              return (
                <Card key={label} className="border-slate-200 dark:border-slate-800 hover:shadow-md transition-shadow">
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-slate-500 dark:text-slate-400">{label}</span>
                      <div className="w-9 h-9 rounded-lg bg-lime-100 dark:bg-lime-900/30 flex items-center justify-center">
                        <Icon className="w-4 h-4 text-lime-600 dark:text-lime-400" />
                      </div>
                    </div>
                    <p className="text-2xl font-bold font-display mb-2">
                      {current.toLocaleString()} / {target.toLocaleString()}{unit}
                    </p>
                    <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-lime-500 to-green-600 transition-all"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Today's Meals */}
            <div id="meal-log" className="lg:col-span-2">
              <Card className="border-slate-200 dark:border-slate-800">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="font-display flex items-center gap-2">
                      <Clock className="w-5 h-5 text-lime-600 dark:text-lime-400" />
                      Today&apos;s Meals
                    </CardTitle>
                    <Button variant="outline" size="sm" className="text-xs">
                      <Plus className="w-3.5 h-3.5 mr-1" /> Add Meal
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-0">
                    {todaysMeals.map((m, i) => {
                      const Icon = m.icon
                      return (
                        <div
                          key={m.meal}
                          className={`flex gap-4 py-4 ${i < todaysMeals.length - 1 ? 'border-b border-slate-100 dark:border-slate-800' : ''}`}
                        >
                          <div className="w-10 h-10 rounded-lg bg-lime-100 dark:bg-lime-900/30 flex items-center justify-center shrink-0">
                            <Icon className="w-5 h-5 text-lime-600 dark:text-lime-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2 flex-wrap">
                              <div>
                                <p className="font-semibold text-slate-900 dark:text-white">{m.meal}</p>
                                <p className="text-xs text-slate-500 dark:text-slate-400">{m.time}</p>
                              </div>
                              <span className="font-bold text-lime-600 dark:text-lime-400">{m.calories} cal</span>
                            </div>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{m.items}</p>
                          </div>
                          <button className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 rounded-lg">
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Macro Breakdown */}
              <Card className="border-slate-200 dark:border-slate-800">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-display">Macro Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {macroBreakdown.map(({ name, value, total, percent, color }) => (
                      <div key={name}>
                        <div className="flex items-center justify-between text-sm mb-1.5">
                          <span className="font-medium">{name}</span>
                          <span className="text-slate-500 dark:text-slate-400">{value}g ({percent}%)</span>
                        </div>
                        <div className="h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${color} transition-all`} style={{ width: `${percent}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Water Intake */}
              <Card className="border-slate-200 dark:border-slate-800">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-display flex items-center gap-2">
                    <GlassWater className="w-4 h-4 text-lime-600 dark:text-lime-400" />
                    Water Intake
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl font-bold font-display text-lime-600 dark:text-lime-400">{waterFilled}/{waterGlasses}</span>
                    <span className="text-sm text-slate-500 dark:text-slate-400">glasses</span>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {Array.from({ length: waterGlasses }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-8 h-10 rounded-md border-2 flex items-center justify-center transition-colors ${
                          i < waterFilled
                            ? 'bg-lime-100 dark:bg-lime-900/40 border-lime-400 dark:border-lime-600'
                            : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700'
                        }`}
                      >
                        {i < waterFilled && <Droplets className="w-4 h-4 text-lime-600 dark:text-lime-400" />}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Weekly Calorie Trend */}
            <Card className="border-slate-200 dark:border-slate-800">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="font-display flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-lime-600 dark:text-lime-400" />
                    Weekly Calorie Trend
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between gap-2 h-40">
                  {weeklyCalorieTrend.map((d) => (
                    <div key={d.day} className="flex-1 flex flex-col items-center gap-2">
                      <div className="w-full flex justify-center">
                        <div
                          className="w-full max-w-8 rounded-t-md bg-gradient-to-t from-lime-500 to-green-600 transition-all"
                          style={{ height: `${(d.calories / maxWeeklyCal) * 120}px`, minHeight: '8px' }}
                        />
                      </div>
                      <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{d.day}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Foods */}
            <Card className="border-slate-200 dark:border-slate-800">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="font-display">Recent Foods</CardTitle>
                  <Button variant="outline" size="sm" className="text-xs">View All</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-800">
                        <th className="text-left py-3 px-2 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Food</th>
                        <th className="text-right py-3 px-2 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Cal</th>
                        <th className="text-right py-3 px-2 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider hidden sm:table-cell">P</th>
                        <th className="text-right py-3 px-2 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider hidden sm:table-cell">C</th>
                        <th className="text-right py-3 px-2 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider hidden sm:table-cell">F</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentFoods.map((f) => (
                        <tr key={f.name} className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                          <td className="py-3 px-2 font-medium">{f.name}</td>
                          <td className="py-3 px-2 text-right">{f.calories}</td>
                          <td className="py-3 px-2 text-right text-slate-500 dark:text-slate-400 hidden sm:table-cell">{f.protein}g</td>
                          <td className="py-3 px-2 text-right text-slate-500 dark:text-slate-400 hidden sm:table-cell">{f.carbs}g</td>
                          <td className="py-3 px-2 text-right text-slate-500 dark:text-slate-400 hidden sm:table-cell">{f.fat}g</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>

      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} aria-hidden="true" />
      )}
    </div>
  )
}

export default App
