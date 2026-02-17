import { useState } from 'react'
import {
  LayoutDashboard, Megaphone, Mail, Share2, Search, FileText, BarChart3, Settings,
  Menu, X, Bell, Plus, ChevronRight, ArrowUpRight, ArrowDownRight, Target,
  TrendingUp, Users, DollarSign, Calendar, Eye, Share
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

/* ------------------------------------------------------------------ */
/*  MOCK DATA                                                          */
/* ------------------------------------------------------------------ */

const sidebarLinks = [
  { icon: LayoutDashboard, label: 'Overview', href: '#', active: true },
  { icon: Megaphone, label: 'Campaigns', href: '#campaigns' },
  { icon: Mail, label: 'Email', href: '#email' },
  { icon: Share2, label: 'Social Media', href: '#social' },
  { icon: Search, label: 'SEO', href: '#seo' },
  { icon: FileText, label: 'Content', href: '#content' },
  { icon: BarChart3, label: 'Analytics', href: '#analytics' },
  { icon: Settings, label: 'Settings', href: '#' },
]

const channelTabs = [
  { id: 'all', label: 'All Channels' },
  { id: 'email', label: 'Email' },
  { id: 'social', label: 'Social' },
  { id: 'seo', label: 'SEO' },
  { id: 'paid', label: 'Paid Ads' },
]

const kpiCards = [
  { label: 'Total Reach', value: '2.4M', change: '+18.5%', trend: 'up', icon: Users },
  { label: 'Engagement Rate', value: '4.8%', change: '+0.6%', trend: 'up', icon: Target },
  { label: 'Leads Generated', value: '1,247', change: '+22.3%', trend: 'up', icon: TrendingUp },
  { label: 'Campaign ROI', value: '340%', change: '+45%', trend: 'up', icon: DollarSign },
]

const activeCampaigns = [
  {
    name: 'Spring Launch 2026',
    channel: 'Email',
    progress: 85,
    metric: '12,400 opens',
    submetric: '3.2% CTR',
  },
  {
    name: 'Social Blitz Q1',
    channel: 'Social',
    progress: 62,
    metric: '45,200 impressions',
    submetric: '5.1% engagement',
  },
  {
    name: 'SEO Content Push',
    channel: 'SEO',
    progress: 40,
    metric: '8,900 organic visits',
    submetric: '+24% MoM',
  },
  {
    name: 'Product Hunt Launch',
    channel: 'Paid',
    progress: 90,
    metric: '$2,400 spent',
    submetric: '180 signups',
  },
  {
    name: 'Newsletter Growth',
    channel: 'Email',
    progress: 55,
    metric: '2,800 new subscribers',
    submetric: '42% open rate',
  },
]

const socialPlatforms = [
  { name: 'Twitter/X', followers: '24.5K', growth: '+1,200 this month', engagement: '3.8%' },
  { name: 'Instagram', followers: '18.2K', growth: '+890 this month', engagement: '5.2%' },
  { name: 'LinkedIn', followers: '12.8K', growth: '+650 this month', engagement: '4.1%' },
  { name: 'YouTube', followers: '8.4K', growth: '+420 this month', engagement: '6.8%' },
]

const topContent = [
  { title: '10 Marketing Trends for 2026', views: '24,500', shares: '1,240', conversion: '4.2%' },
  { title: 'How to Build a Content Strategy', views: '18,200', shares: '890', conversion: '3.8%' },
  { title: 'Email Marketing Best Practices', views: '15,800', shares: '620', conversion: '5.1%' },
]

const emailCampaigns = [
  { name: 'Spring Sale Announcement', sent: '24,500', opens: '42%', clickRate: '3.8%', conversions: 245, revenue: '$12,400' },
  { name: 'Product Update v2.0', sent: '18,200', opens: '38%', clickRate: '4.2%', conversions: 182, revenue: '$8,900' },
  { name: 'Weekly Newsletter #42', sent: '15,800', opens: '45%', clickRate: '5.1%', conversions: 128, revenue: '$4,200' },
  { name: 'Webinar Invitation', sent: '12,400', opens: '52%', clickRate: '8.4%', conversions: 310, revenue: '$15,500' },
  { name: 'Customer Survey', sent: '20,100', opens: '35%', clickRate: '2.1%', conversions: 89, revenue: '-' },
]

const contentCalendar = [
  { date: 'Feb 18', type: 'Blog', title: 'Q1 Marketing Recap', status: 'Scheduled' },
  { date: 'Feb 19', type: 'Social', title: 'Product Launch Teaser', status: 'Scheduled' },
  { date: 'Feb 20', type: 'Email', title: 'Weekly Digest #43', status: 'Draft' },
  { date: 'Feb 21', type: 'Blog', title: 'SEO Checklist 2026', status: 'In Review' },
  { date: 'Feb 22', type: 'Social', title: 'Customer Story Feature', status: 'Scheduled' },
]

/* ------------------------------------------------------------------ */
/*  APP                                                                */
/* ------------------------------------------------------------------ */

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeChannel, setActiveChannel] = useState('all')

  const channelBadgeColors = {
    Email: 'bg-fuchsia-100 dark:bg-fuchsia-900/30 text-fuchsia-700 dark:text-fuchsia-400',
    Social: 'bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-400',
    SEO: 'bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400',
    Paid: 'bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-400',
  }

  const statusBadgeColors = {
    Scheduled: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400',
    Draft: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400',
    'In Review': 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
  }

  const typeBadgeColors = {
    Blog: 'bg-fuchsia-100 dark:bg-fuchsia-900/30 text-fuchsia-700 dark:text-fuchsia-400',
    Social: 'bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-400',
    Email: 'bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400',
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
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-fuchsia-500 to-pink-600 flex items-center justify-center">
              <Megaphone className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold font-display">Marketing Hub</span>
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
                  ? 'bg-fuchsia-50 dark:bg-fuchsia-900/20 text-fuchsia-700 dark:text-fuchsia-400'
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
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 rounded-lg p-0.5 overflow-x-auto shrink-0">
            {channelTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveChannel(tab.id)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-all ${
                  activeChannel === tab.id
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="hidden md:flex flex-1 max-w-xs mx-4">
            <Input
              placeholder="Search campaigns..."
              className="h-9 bg-slate-100 dark:bg-slate-800 border-0 text-sm"
            />
          </div>
          <div className="flex items-center gap-2 ml-auto shrink-0">
            <Button
              className="bg-gradient-to-r from-fuchsia-500 to-pink-600 hover:from-fuchsia-600 hover:to-pink-700 text-white border-0 shadow-lg shadow-fuchsia-500/25"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Campaign
            </Button>
            <button className="relative p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-fuchsia-500 rounded-full" />
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="p-4 sm:p-6 space-y-6">
          <div>
            <h1 className="text-2xl font-bold font-display">Overview</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Your marketing performance at a glance</p>
          </div>

          {/* KPI Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {kpiCards.map(({ label, value, change, trend, icon: Icon }) => (
              <Card key={label} className="border-slate-200 dark:border-slate-800 hover:shadow-md transition-shadow">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-slate-500 dark:text-slate-400">{label}</span>
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-fuchsia-500/20 to-pink-600/20 dark:from-fuchsia-500/30 dark:to-pink-600/30 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-fuchsia-600 dark:text-fuchsia-400" />
                    </div>
                  </div>
                  <p className="text-2xl font-bold font-display mb-1">{value}</p>
                  <div className="flex items-center gap-1">
                    {trend === 'up' ? (
                      <ArrowUpRight className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4 text-red-500" />
                    )}
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400">{change}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Campaign Performance */}
            <Card id="campaigns" className="border-slate-200 dark:border-slate-800 lg:col-span-2 overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-fuchsia-500 to-pink-600" />
              <CardHeader>
                <CardTitle className="font-display flex items-center gap-2">
                  <Megaphone className="w-5 h-5 text-fuchsia-600 dark:text-fuchsia-400" />
                  Campaign Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activeCampaigns.map((campaign) => (
                    <div
                      key={campaign.name}
                      className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <h3 className="font-semibold">{campaign.name}</h3>
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${channelBadgeColors[campaign.channel] || 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`}>
                          {campaign.channel}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-2">
                        <span>{campaign.metric}</span>
                        <span>•</span>
                        <span>{campaign.submetric}</span>
                      </div>
                      <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-fuchsia-500 to-pink-600 transition-all"
                          style={{ width: `${campaign.progress}%` }}
                        />
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{campaign.progress}% complete</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Social Media Overview */}
              <Card id="social" className="border-slate-200 dark:border-slate-800">
                <CardHeader>
                  <CardTitle className="font-display text-base flex items-center gap-2">
                    <Share2 className="w-4 h-4 text-fuchsia-600 dark:text-fuchsia-400" />
                    Social Media Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {socialPlatforms.map((platform) => (
                      <div
                        key={platform.name}
                        className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50"
                      >
                        <div>
                          <p className="font-medium text-sm">{platform.name}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">{platform.growth}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-fuchsia-600 dark:text-fuchsia-400">{platform.followers}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">{platform.engagement} engagement</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Top Content */}
              <Card id="content" className="border-slate-200 dark:border-slate-800">
                <CardHeader>
                  <CardTitle className="font-display text-base flex items-center gap-2">
                    <FileText className="w-4 h-4 text-fuchsia-600 dark:text-fuchsia-400" />
                    Top Content
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {topContent.map((item) => (
                      <div
                        key={item.title}
                        className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700"
                      >
                        <p className="font-medium text-sm line-clamp-2 mb-2">{item.title}</p>
                        <div className="flex flex-wrap gap-2 text-xs text-slate-500 dark:text-slate-400">
                          <span className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {item.views} views
                          </span>
                          <span className="flex items-center gap-1">
                            <Share className="w-3 h-3" />
                            {item.shares} shares
                          </span>
                          <span className="font-medium text-fuchsia-600 dark:text-fuchsia-400">{item.conversion} conversion</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Email Performance Table */}
          <Card id="email" className="border-slate-200 dark:border-slate-800">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2">
                <Mail className="w-5 h-5 text-fuchsia-600 dark:text-fuchsia-400" />
                Email Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800">
                      <th className="text-left py-3 px-2 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Campaign Name</th>
                      <th className="text-right py-3 px-2 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Sent</th>
                      <th className="text-right py-3 px-2 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Opens</th>
                      <th className="text-right py-3 px-2 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Click Rate</th>
                      <th className="text-right py-3 px-2 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Conversions</th>
                      <th className="text-right py-3 px-2 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Revenue</th>
                    </tr>
                  </thead>
                  <tbody>
                    {emailCampaigns.map((row, i) => (
                      <tr key={i} className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                        <td className="py-3 px-2 font-medium">{row.name}</td>
                        <td className="py-3 px-2 text-right text-slate-600 dark:text-slate-400">{row.sent}</td>
                        <td className="py-3 px-2 text-right">{row.opens}</td>
                        <td className="py-3 px-2 text-right">{row.clickRate}</td>
                        <td className="py-3 px-2 text-right">{row.conversions}</td>
                        <td className="py-3 px-2 text-right font-medium text-fuchsia-600 dark:text-fuchsia-400">{row.revenue}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Content Calendar */}
          <Card className="border-slate-200 dark:border-slate-800">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2">
                <Calendar className="w-5 h-5 text-fuchsia-600 dark:text-fuchsia-400" />
                Content Calendar
              </CardTitle>
              <p className="text-xs text-slate-500 dark:text-slate-400">Next scheduled items</p>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {contentCalendar.map((item) => (
                  <div
                    key={`${item.date}-${item.title}`}
                    className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-fuchsia-600 dark:text-fuchsia-400">{item.date}</span>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${typeBadgeColors[item.type] || 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`}>
                        {item.type}
                      </span>
                    </div>
                    <p className="font-medium text-sm mb-2 line-clamp-2">{item.title}</p>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${statusBadgeColors[item.status] || 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`}>
                      {item.status}
                    </span>
                  </div>
                ))}
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
