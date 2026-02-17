import { useState } from 'react'
import {
  Salad, UtensilsCrossed, ShoppingCart, ChefHat, TrendingDown, Target, Calendar, Clock,
  Plus, Menu, X, Bell, Search, ChevronDown, ChevronRight, CheckCircle2, Circle,
  Leaf, Wheat, Scale, Sparkles, BookOpen, Heart, LayoutDashboard, Settings
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

/* ------------------------------------------------------------------ */
/*  MOCK DATA                                                          */
/* ------------------------------------------------------------------ */

const sidebarLinks = [
  { icon: LayoutDashboard, label: 'Overview', href: '#', active: true },
  { icon: UtensilsCrossed, label: 'Meal Plans', href: '#meal-plans' },
  { icon: BookOpen, label: 'Recipes', href: '#recipes' },
  { icon: ShoppingCart, label: 'Grocery List', href: '#grocery' },
  { icon: TrendingDown, label: 'Progress', href: '#progress' },
  { icon: Target, label: 'Preferences', href: '#' },
  { icon: Settings, label: 'Settings', href: '#' },
]

const dietProfile = {
  dietType: 'Balanced',
  calorieTarget: 2200,
  restrictions: ['Gluten-free'],
  goal: 'Weight Loss',
}

const weeklyMeals = [
  {
    day: 'Monday',
    breakfast: 'Avocado Toast',
    lunch: 'Quinoa Bowl',
    dinner: 'Grilled Salmon',
  },
  {
    day: 'Tuesday',
    breakfast: 'Smoothie Bowl',
    lunch: 'Turkey Wrap',
    dinner: 'Stir Fry',
  },
  {
    day: 'Wednesday',
    breakfast: 'Overnight Oats',
    lunch: 'Chicken Salad',
    dinner: 'Pasta Primavera',
  },
  { day: 'Thursday', breakfast: null, lunch: null, dinner: null },
  { day: 'Friday', breakfast: null, lunch: null, dinner: null },
  { day: 'Saturday', breakfast: null, lunch: null, dinner: null },
  { day: 'Sunday', breakfast: null, lunch: null, dinner: null },
]

const groceryCategories = [
  {
    category: 'Produce',
    icon: Leaf,
    items: [
      { name: 'Avocados', qty: 3, checked: false },
      { name: 'Spinach', qty: 1, checked: false },
      { name: 'Tomatoes', qty: 1, checked: true },
      { name: 'Broccoli', qty: 1, checked: false },
    ],
  },
  {
    category: 'Protein',
    icon: UtensilsCrossed,
    items: [
      { name: 'Chicken breast', qty: 1, checked: false },
      { name: 'Salmon fillets', qty: 1, checked: false },
      { name: 'Eggs', qty: 1, checked: true },
    ],
  },
  {
    category: 'Grains',
    icon: Wheat,
    items: [
      { name: 'Quinoa', qty: 1, checked: false },
      { name: 'Brown rice', qty: 1, checked: false },
      { name: 'Whole wheat bread', qty: 1, checked: false },
    ],
  },
]

const nutritionGoals = [
  { label: 'Calories', current: 2050, target: 2200, unit: 'kcal', icon: Target },
  { label: 'Protein', current: 95, target: 110, unit: 'g', icon: UtensilsCrossed },
  { label: 'Fiber', current: 28, target: 30, unit: 'g', icon: Leaf },
  { label: 'Vitamins', current: 88, target: 100, unit: '%', icon: Sparkles },
]

const recipeSuggestions = [
  {
    title: 'Mediterranean Quinoa Bowl',
    prepTime: 25,
    calories: 420,
    difficulty: 'Easy',
    image: null,
  },
  {
    title: 'Honey Garlic Salmon',
    prepTime: 35,
    calories: 380,
    difficulty: 'Medium',
    image: null,
  },
  {
    title: 'Avocado Egg Toast',
    prepTime: 15,
    calories: 320,
    difficulty: 'Easy',
    image: null,
  },
]

const weightData = [
  { week: 'Week 1', value: 185, label: '185 lbs' },
  { week: 'Week 2', value: 183.5, label: '183.5 lbs' },
  { week: 'Week 3', value: 182, label: '182 lbs' },
  { week: 'Week 4', value: 181, label: '181 lbs' },
]

const weekRange = { start: 'Feb 17', end: 'Feb 23' }

/* ------------------------------------------------------------------ */
/*  APP                                                                */
/* ------------------------------------------------------------------ */

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [groceryItems, setGroceryItems] = useState(groceryCategories)

  const toggleGroceryItem = (catIndex, itemIndex) => {
    setGroceryItems((prev) => {
      const next = JSON.parse(JSON.stringify(prev))
      next[catIndex].items[itemIndex].checked = !next[catIndex].items[itemIndex].checked
      return next
    })
  }

  const weightMax = Math.max(...weightData.map((d) => d.value))
  const weightMin = Math.min(...weightData.map((d) => d.value))
  const weightRange = weightMax - weightMin || 1

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
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center">
              <Salad className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold font-display">Diet Planner</span>
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
                  ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Icon className="w-4.5 h-4.5 shrink-0" />
              <span className="flex-1">{label}</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </a>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <div className="lg:pl-60">
        {/* Header */}
        <header className="sticky top-0 h-14 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 flex items-center gap-4 px-4 sm:px-6 z-30">
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 text-slate-600 dark:text-slate-400">
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 rounded-lg px-3 py-2">
              <Calendar className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span className="text-sm font-medium">
                Week of {weekRange.start} – {weekRange.end}
              </span>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2 flex-1 max-w-xs">
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <Input
              placeholder="Search meals..."
              className="h-9 bg-slate-100 dark:bg-slate-800 border-0 text-sm"
            />
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <Button
              size="sm"
              className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white border-0 shadow-lg shadow-emerald-500/25"
            >
              <Plus className="w-3.5 h-3.5 mr-1.5" />
              Generate Plan
            </Button>
            <div className="hidden md:flex items-center gap-2 flex-1 max-w-xs">
              <Search className="w-4 h-4 text-slate-400 shrink-0" />
              <Input
                placeholder="Search meals..."
                className="h-9 bg-slate-100 dark:bg-slate-800 border-0 text-sm"
              />
            </div>
            <button className="relative p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-emerald-500 rounded-full" />
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="p-4 sm:p-6 space-y-6">
          <div>
            <h1 className="text-2xl font-bold font-display">Overview</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Your diet dashboard for this week</p>
          </div>

          {/* Diet Profile */}
          <Card className="border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-emerald-500 to-green-600" />
            <CardHeader className="pb-3">
              <CardTitle className="font-display flex items-center gap-2">
                <Target className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                Diet Profile
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                  <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider">Diet Type</p>
                  <p className="font-semibold mt-1">{dietProfile.dietType}</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                  <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider">Calorie Target</p>
                  <p className="font-semibold mt-1">{dietProfile.calorieTarget.toLocaleString()} kcal/day</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                  <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider">Restrictions</p>
                  <p className="font-semibold mt-1">{dietProfile.restrictions.join(', ')}</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                  <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider">Goal</p>
                  <p className="font-semibold mt-1 flex items-center gap-1">
                    <TrendingDown className="w-4 h-4 text-emerald-500" />
                    {dietProfile.goal}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Weekly Meal Plan */}
          <Card id="meal-plans" className="border-slate-200 dark:border-slate-800">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2">
                <UtensilsCrossed className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                Weekly Meal Plan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto -mx-2">
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 min-w-[500px]">
                  {weeklyMeals.map((day) => (
                    <div
                      key={day.day}
                      className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700"
                    >
                      <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-3">
                        {day.day}
                      </p>
                      <div className="space-y-2 text-sm">
                        <div>
                          <p className="text-xs text-slate-500 dark:text-slate-400">Breakfast</p>
                          <p className="font-medium truncate">{day.breakfast || 'Plan meals'}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 dark:text-slate-400">Lunch</p>
                          <p className="font-medium truncate">{day.lunch || 'Plan meals'}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 dark:text-slate-400">Dinner</p>
                          <p className="font-medium truncate">{day.dinner || 'Plan meals'}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Grocery List */}
            <Card id="grocery" className="border-slate-200 dark:border-slate-800 lg:col-span-2">
              <CardHeader>
                <CardTitle className="font-display flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  Grocery List
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {groceryItems.map((cat, catIndex) => (
                    <div key={cat.category} className="space-y-2">
                      <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                        <cat.icon className="w-4 h-4 text-emerald-500" />
                        {cat.category}
                      </div>
                      <ul className="space-y-1.5">
                        {cat.items.map((item, itemIndex) => (
                          <li
                            key={item.name}
                            className="flex items-center gap-2 text-sm cursor-pointer group"
                            onClick={() => toggleGroceryItem(catIndex, itemIndex)}
                          >
                            {item.checked ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                            ) : (
                              <Circle className="w-4 h-4 text-slate-300 dark:text-slate-600 shrink-0" />
                            )}
                            <span
                              className={
                                item.checked
                                  ? 'line-through text-slate-500 dark:text-slate-400'
                                  : 'text-slate-700 dark:text-slate-300'
                              }
                            >
                              {item.name}
                              {item.qty > 1 && ` (${item.qty})`}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Nutrition Goals Progress */}
            <Card id="progress" className="border-slate-200 dark:border-slate-800">
              <CardHeader>
                <CardTitle className="font-display flex items-center gap-2">
                  <Target className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  Nutrition Goals
                </CardTitle>
                <p className="text-xs text-slate-500 dark:text-slate-400">Weekly averages</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {nutritionGoals.map((goal) => {
                    const pct = Math.min(100, (goal.current / goal.target) * 100)
                    const Icon = goal.icon
                    return (
                      <div key={goal.label} className="space-y-1.5">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <Icon className="w-3.5 h-3.5 text-emerald-500" />
                            <span className="font-medium">{goal.label}</span>
                          </div>
                          <span className="text-slate-500 dark:text-slate-400">
                            {goal.current}/{goal.target} {goal.unit}
                          </span>
                        </div>
                        <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-green-600 transition-all"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recipe Suggestions */}
          <Card id="recipes" className="border-slate-200 dark:border-slate-800">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2">
                <ChefHat className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                Recipe Suggestions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {recipeSuggestions.map((recipe) => (
                  <div
                    key={recipe.title}
                    className="group rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden hover:border-emerald-500/50 dark:hover:border-emerald-500/50 transition-colors"
                  >
                    <div className="aspect-video bg-gradient-to-br from-emerald-100 to-green-200 dark:from-emerald-900/30 dark:to-green-900/30 flex items-center justify-center relative">
                      <UtensilsCrossed className="w-12 h-12 text-emerald-400/60 dark:text-emerald-500/40" />
                      <Heart className="w-5 h-5 text-slate-300 dark:text-slate-600 absolute top-2 right-2 hover:text-rose-500 cursor-pointer" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-sm mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        {recipe.title}
                      </h3>
                      <div className="flex flex-wrap gap-2 text-xs text-slate-500 dark:text-slate-400">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {recipe.prepTime} min
                        </span>
                        <span>{recipe.calories} kcal</span>
                        <span
                          className={`font-medium ${
                            recipe.difficulty === 'Easy'
                              ? 'text-emerald-600 dark:text-emerald-400'
                              : 'text-amber-600 dark:text-amber-400'
                          }`}
                        >
                          {recipe.difficulty}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Weight Progress */}
          <Card className="border-slate-200 dark:border-slate-800">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2">
                <Scale className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                Weight Progress
              </CardTitle>
              <p className="text-xs text-slate-500 dark:text-slate-400">Last 4 weeks</p>
            </CardHeader>
            <CardContent>
              <div className="flex items-end gap-4 sm:gap-6 h-32">
                {weightData.map((d, i) => {
                  const heightPct = ((d.value - weightMin) / weightRange) * 60 + 20
                  return (
                    <div key={d.week} className="flex-1 flex flex-col items-center gap-2">
                      <div className="w-full flex flex-col items-center justify-end h-24">
                        <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                          {d.label}
                        </span>
                        <div
                          className="w-full max-w-[60px] rounded-t-lg bg-gradient-to-t from-emerald-500 to-green-600 transition-all hover:from-emerald-600 hover:to-green-700"
                          style={{ height: `${heightPct}%` }}
                        />
                      </div>
                      <span className="text-xs text-slate-500 dark:text-slate-400">{d.week}</span>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>

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
