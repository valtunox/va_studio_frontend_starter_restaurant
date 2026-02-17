import { useState } from 'react'
import {
  Trophy, Timer, Users, Calendar, TrendingUp, Star, MapPin, Clock, Plus, Menu, X, Bell, Search,
  Settings, ChevronDown, ChevronRight, Play, Circle, Zap, BarChart3, ArrowUpRight, Shield, Flag,
  Target, Activity, Eye, Radio, LayoutDashboard
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

/* ------------------------------------------------------------------ */
/*  MOCK DATA                                                          */
/* ------------------------------------------------------------------ */

const sidebarLinks = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '#', active: true },
  { icon: Radio, label: 'Live Scores', href: '#live' },
  { icon: Users, label: 'Teams', href: '#' },
  { icon: Calendar, label: 'Schedule', href: '#' },
  { icon: Trophy, label: 'Standings', href: '#standings' },
  { icon: Star, label: 'Players', href: '#players' },
  { icon: Activity, label: 'News', href: '#news' },
  { icon: Settings, label: 'Settings', href: '#' },
]

const sports = ['Football', 'Basketball', 'Soccer', 'Tennis']

const liveMatches = [
  { home: 'Lakers', away: 'Celtics', score: '108 - 102', status: 'Final', isLive: false },
  { home: 'Man City', away: 'Arsenal', score: '2 - 1', status: "67'", isLive: true },
  { home: 'Djokovic', away: 'Nadal', score: '6-4, 3-2', status: 'Live, Set 2', isLive: true },
]

const kpis = [
  { label: 'Matches Today', value: 12, icon: Calendar },
  { label: 'Live Now', value: 3, icon: Radio },
  { label: 'Upcoming', value: 8, icon: Clock },
  { label: 'Completed', value: 1, icon: Shield },
]

const standings = [
  { rank: 1, team: 'Man City', played: 24, won: 18, drawn: 4, lost: 2, points: 58 },
  { rank: 2, team: 'Arsenal', played: 24, won: 17, drawn: 3, lost: 4, points: 54 },
  { rank: 3, team: 'Liverpool', played: 24, won: 16, drawn: 5, lost: 3, points: 53 },
  { rank: 4, team: 'Chelsea', played: 24, won: 14, drawn: 6, lost: 4, points: 48 },
  { rank: 5, team: 'Tottenham', played: 24, won: 13, drawn: 4, lost: 7, points: 43 },
  { rank: 6, team: 'Newcastle', played: 24, won: 12, drawn: 5, lost: 7, points: 41 },
]

const upcomingMatches = [
  { date: 'Feb 18', time: '3:00 PM', home: 'Liverpool', away: 'Man United', venue: 'Anfield' },
  { date: 'Feb 19', time: '7:45 PM', home: 'Real Madrid', away: 'Barcelona', venue: 'Santiago Bernabéu' },
  { date: 'Feb 20', time: '2:30 PM', home: 'Bayern Munich', away: 'Dortmund', venue: 'Allianz Arena' },
  { date: 'Feb 21', time: '8:00 PM', home: 'PSG', away: 'Marseille', venue: 'Parc des Princes' },
]

const topPlayers = [
  { name: 'Erling Haaland', team: 'Man City', position: 'Striker', stat1: '22 goals', stat2: '5 assists' },
  { name: 'LeBron James', team: 'Lakers', position: 'Forward', stat1: '28.4 ppg', stat2: '8.2 rpg' },
  { name: 'Kevin De Bruyne', team: 'Man City', position: 'Midfielder', stat1: '12 assists', stat2: '8 goals' },
  { name: 'Mohamed Salah', team: 'Liverpool', position: 'Forward', stat1: '18 goals', stat2: '9 assists' },
]

const recentNews = [
  {
    title: 'Title Race Heats Up as Arsenal Close Gap on Man City',
    excerpt: 'Arsenal secured a crucial 2-1 victory over Man City to move within two points of the league leaders...',
    timestamp: '2 hours ago',
    category: 'Premier League',
  },
  {
    title: 'Lakers Edge Celtics in Overtime Thriller',
    excerpt: 'LeBron James led the Lakers to a 108-102 victory in a classic rivalry matchup at TD Garden...',
    timestamp: '4 hours ago',
    category: 'NBA',
  },
  {
    title: 'Djokovic vs Nadal: Australian Open Semifinal Preview',
    excerpt: 'The two legends face off once again in what promises to be an epic clash on Rod Laver Arena...',
    timestamp: '6 hours ago',
    category: 'Tennis',
  },
]

/* ------------------------------------------------------------------ */
/*  APP                                                                */
/* ------------------------------------------------------------------ */

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedSport, setSelectedSport] = useState('Soccer')

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
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center">
              <Trophy className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold font-display">Sports Hub</span>
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
                  ? 'bg-sky-50 dark:bg-sky-900/20 text-sky-700 dark:text-sky-400'
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
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 rounded-lg p-0.5 overflow-x-auto">
              {sports.map((sport) => (
                <button
                  key={sport}
                  onClick={() => setSelectedSport(sport)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-all ${
                    selectedSport === sport
                      ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-500/25'
                      : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                  }`}
                >
                  {sport}
                </button>
              ))}
            </div>
          </div>
          <div className="flex-1 min-w-0 max-w-md hidden sm:flex items-center">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 shrink-0" />
              <Input
                placeholder="Search teams, players, matches..."
                className="h-9 pl-9 bg-slate-100 dark:bg-slate-800 border-0 text-sm"
              />
            </div>
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <Button
              size="sm"
              className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white border-0 shadow-lg shadow-sky-500/25"
            >
              <Plus className="w-3.5 h-3.5 mr-1.5" />
              <span className="hidden sm:inline">Follow Match</span>
            </Button>
            <button className="relative p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-sky-500 rounded-full" />
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="p-4 sm:p-6 space-y-6">
          <div>
            <h1 className="text-2xl font-bold font-display">Sports Hub</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Your central hub for live scores, standings, and news</p>
          </div>

          {/* Live Scores Banner */}
          <section id="live" className="rounded-xl border border-slate-200 dark:border-slate-800 bg-gradient-to-r from-sky-500/10 via-blue-500/10 to-sky-500/10 dark:from-sky-500/5 dark:via-blue-500/5 dark:to-sky-500/5 overflow-hidden">
            <div className="p-4 sm:p-5">
              <div className="flex items-center gap-2 mb-4">
                <Radio className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                <h2 className="font-semibold font-display">Live Scores</h2>
                <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                  <Circle className="w-2 h-2 fill-current animate-pulse" />
                  Live
                </span>
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                {liveMatches.map((match) => (
                  <div
                    key={`${match.home}-${match.away}`}
                    className="p-4 rounded-lg bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 hover:border-sky-500/50 dark:hover:border-sky-500/50 transition-colors"
                  >
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-sm font-medium truncate">{match.home}</span>
                      <span className="text-lg font-bold font-display shrink-0">{match.score}</span>
                      <span className="text-sm font-medium truncate text-right">{match.away}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                        match.isLive
                          ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                      }`}>
                        {match.isLive && <Play className="w-3 h-3 inline mr-1 -mt-0.5" />}
                        {match.status}
                      </span>
                      <button className="text-xs font-medium text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        View
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* KPI Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {kpis.map(({ label, value, icon: Icon }) => (
              <Card key={label} className="border-slate-200 dark:border-slate-800 hover:shadow-md transition-shadow">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-slate-500 dark:text-slate-400">{label}</span>
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-sky-500/20 to-blue-600/20 dark:from-sky-500/30 dark:to-blue-600/30 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                    </div>
                  </div>
                  <p className="text-2xl font-bold font-display">{value}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <ArrowUpRight className="w-4 h-4 text-emerald-500" />
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400">vs yesterday</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* League Standings */}
            <div id="standings" className="lg:col-span-2">
              <Card className="border-slate-200 dark:border-slate-800">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="font-display flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                      League Standings
                    </CardTitle>
                    <Button variant="outline" size="sm" className="text-xs">
                      View All <ChevronRight className="w-3.5 h-3.5 ml-1" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-slate-200 dark:border-slate-800">
                          <th className="text-left py-3 px-2 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Rank</th>
                          <th className="text-left py-3 px-2 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Team</th>
                          <th className="text-right py-3 px-2 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Played</th>
                          <th className="text-right py-3 px-2 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider hidden sm:table-cell">W</th>
                          <th className="text-right py-3 px-2 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider hidden sm:table-cell">D</th>
                          <th className="text-right py-3 px-2 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider hidden sm:table-cell">L</th>
                          <th className="text-right py-3 px-2 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Pts</th>
                        </tr>
                      </thead>
                      <tbody>
                        {standings.map((row) => (
                          <tr key={row.team} className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                            <td className="py-3 px-2 font-medium">{row.rank}</td>
                            <td className="py-3 px-2 font-medium">{row.team}</td>
                            <td className="py-3 px-2 text-right text-slate-600 dark:text-slate-400">{row.played}</td>
                            <td className="py-3 px-2 text-right hidden sm:table-cell text-emerald-600 dark:text-emerald-400">{row.won}W</td>
                            <td className="py-3 px-2 text-right hidden sm:table-cell text-slate-500 dark:text-slate-400">{row.drawn}D</td>
                            <td className="py-3 px-2 text-right hidden sm:table-cell text-red-500 dark:text-red-400">{row.lost}L</td>
                            <td className="py-3 px-2 text-right font-bold text-sky-600 dark:text-sky-400">{row.points}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Upcoming Matches */}
            <div>
              <Card className="border-slate-200 dark:border-slate-800">
                <CardHeader>
                  <CardTitle className="font-display flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                    Upcoming Matches
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {upcomingMatches.map((match) => (
                      <div
                        key={`${match.home}-${match.away}`}
                        className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 hover:border-sky-500/50 dark:hover:border-sky-500/50 transition-colors"
                      >
                        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-2">
                          <Clock className="w-3 h-3" />
                          {match.date} · {match.time}
                        </div>
                        <div className="font-medium text-sm mb-1">{match.home} vs {match.away}</div>
                        <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                          <MapPin className="w-3 h-3 shrink-0" />
                          {match.venue}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Top Players */}
            <div id="players" className="lg:col-span-2">
              <Card className="border-slate-200 dark:border-slate-800">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="font-display flex items-center gap-2">
                      <Star className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                      Top Players
                    </CardTitle>
                    <Button variant="outline" size="sm" className="text-xs">
                      View All <ChevronRight className="w-3.5 h-3.5 ml-1" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {topPlayers.map((player) => (
                      <div
                        key={player.name}
                        className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 hover:border-sky-500/50 dark:hover:border-sky-500/50 transition-colors"
                      >
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg shrink-0">
                          {player.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold truncate">{player.name}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">{player.team} · {player.position}</p>
                          <div className="flex items-center gap-2 mt-1 text-xs font-medium text-sky-600 dark:text-sky-400">
                            <BarChart3 className="w-3 h-3" />
                            {player.stat1} · {player.stat2}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent News */}
            <div id="news">
              <Card className="border-slate-200 dark:border-slate-800">
                <CardHeader>
                  <CardTitle className="font-display flex items-center gap-2">
                    <Activity className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                    Recent News
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentNews.map((item) => (
                      <a
                        key={item.title}
                        href="#"
                        className="block p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-sky-500/50 dark:hover:border-sky-500/50 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group"
                      >
                        <span className="inline-block px-2 py-0.5 text-xs font-medium rounded-full bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-400 mb-2">
                          {item.category}
                        </span>
                        <h3 className="font-medium text-sm group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors line-clamp-2">
                          {item.title}
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                          {item.excerpt}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-slate-400 dark:text-slate-500">{item.timestamp}</span>
                          <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-sky-500 transition-colors" />
                        </div>
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
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
