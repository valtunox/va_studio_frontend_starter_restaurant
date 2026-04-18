import {
  Menu as MenuIcon,
  X,
  MapPin,
  Phone,
  Clock,
  Instagram,
  Facebook,
  Star,
  UtensilsCrossed,
  Flame,
  Leaf,
  ChefHat,
  Wine,
  Calendar,
  Mail,
} from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ThemeSwitcher } from '@/components/shared/ThemeSwitcher'

const nav = [
  { label: 'Menu', href: '#menu' },
  { label: 'Our Story', href: '#story' },
  { label: 'Reservations', href: '#reserve' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
]

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1800&q=80'

const STORY_IMAGE =
  'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1400&q=80'

const highlights = [
  {
    icon: ChefHat,
    title: 'Chef Driven',
    desc: 'Guided by Chef Marco Fiorella, whose menu changes with the seasons and the market.',
  },
  {
    icon: Leaf,
    title: 'Farm to Table',
    desc: 'We source produce daily from small farms within 80 miles of the kitchen.',
  },
  {
    icon: Flame,
    title: 'Wood Fired',
    desc: 'Our 900°F oak-burning oven gives every pizza its signature blistered crust.',
  },
]

const menu = [
  {
    category: 'Antipasti',
    items: [
      {
        name: 'Burrata Pugliese',
        price: '$16',
        desc: 'Creamy burrata, heirloom tomato, basil oil, crusty sourdough.',
        tag: 'Signature',
        img: 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?auto=format&fit=crop&w=900&q=80',
      },
      {
        name: 'Carpaccio di Manzo',
        price: '$18',
        desc: 'Thinly sliced beef tenderloin, arugula, parmigiano, lemon.',
        img: 'https://images.unsplash.com/photo-1432139509613-5c4255815697?auto=format&fit=crop&w=900&q=80',
      },
    ],
  },
  {
    category: 'Pasta',
    items: [
      {
        name: 'Tagliatelle al Ragù',
        price: '$24',
        desc: 'Hand-cut tagliatelle, slow-braised beef and pork ragù, parmigiano 24-mo.',
        tag: 'Chef\u2019s Pick',
        img: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=900&q=80',
      },
      {
        name: 'Cacio e Pepe',
        price: '$22',
        desc: 'Tonnarelli, Pecorino Romano DOP, cracked Tellicherry pepper.',
        img: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=900&q=80',
      },
      {
        name: 'Gnocchi al Pomodoro',
        price: '$21',
        desc: 'Potato gnocchi, San Marzano tomato, basil, stracciatella.',
        img: 'https://images.unsplash.com/photo-1587740908075-9e245311d91c?auto=format&fit=crop&w=900&q=80',
      },
    ],
  },
  {
    category: 'Forno',
    items: [
      {
        name: 'Margherita D.O.P.',
        price: '$19',
        desc: 'San Marzano, fior di latte, basil, extra virgin olive oil.',
        img: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=900&q=80',
      },
      {
        name: 'Prosciutto & Rucola',
        price: '$23',
        desc: 'Prosciutto di Parma, arugula, shaved parmigiano, lemon.',
        tag: 'New',
        img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=80',
      },
    ],
  },
  {
    category: 'Dolci',
    items: [
      {
        name: 'Tiramisu della Casa',
        price: '$12',
        desc: 'Espresso-soaked savoiardi, mascarpone cream, cocoa, Marsala.',
        img: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=900&q=80',
      },
      {
        name: 'Panna Cotta',
        price: '$11',
        desc: 'Vanilla bean panna cotta, wild berry compote, mint.',
        img: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=900&q=80',
      },
    ],
  },
]

const gallery = [
  'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1498579150354-977475b7ea0b?auto=format&fit=crop&w=900&q=80',
]

const reviews = [
  {
    name: 'Eater Magazine',
    quote: '\u201CFiorella\u2019s handmade pasta sets a new bar in the neighborhood.\u201D',
    stars: 5,
  },
  {
    name: 'The Local Times',
    quote: '\u201CA warm room, a serious wine list, and pizza that rivals Naples.\u201D',
    stars: 5,
  },
  {
    name: 'Time Out Food',
    quote: '\u201CFiorella is the kind of restaurant every neighborhood deserves.\u201D',
    stars: 5,
  },
]

const hours = [
  { day: 'Monday', time: 'Closed' },
  { day: 'Tuesday – Thursday', time: '5:00 – 10:00 pm' },
  { day: 'Friday – Saturday', time: '5:00 – 11:30 pm' },
  { day: 'Sunday', time: '4:00 – 9:00 pm' },
]

function Logo() {
  return (
    <div className="flex items-center gap-2 font-semibold">
      <UtensilsCrossed className="h-5 w-5 text-amber-600" />
      <span
        className="text-xl tracking-wide"
        style={{ fontFamily: '"Playfair Display", serif', fontStyle: 'italic' }}
      >
        Fiorella
      </span>
    </div>
  )
}

function SectionHeading({ eyebrow, title, children }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      {eyebrow && (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-amber-600">
          {eyebrow}
        </p>
      )}
      <h2
        className="text-3xl font-semibold tracking-tight sm:text-4xl"
        style={{ fontFamily: '"Playfair Display", serif' }}
      >
        {title}
      </h2>
      {children && (
        <p className="mt-4 text-slate-600 dark:text-slate-300">{children}</p>
      )}
    </div>
  )
}

export default function RestaurantTemplate() {
  const [open, setOpen] = useState(false)
  const [activeCat, setActiveCat] = useState(menu[0].category)
  const current = menu.find((m) => m.category === activeCat)

  return (
    <div
      className="min-h-screen bg-stone-50 text-slate-900 dark:bg-[#0d0b08] dark:text-stone-100"
      style={{ fontFamily: 'Inter, ui-sans-serif, system-ui' }}
    >
      {/* ----------------------------------------------------------------- */}
      {/* Header                                                            */}
      {/* ----------------------------------------------------------------- */}
      <header className="sticky top-0 z-40 border-b border-stone-200/80 bg-stone-50/90 backdrop-blur dark:border-stone-800 dark:bg-[#0d0b08]/90">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Logo />
          <nav className="hidden items-center gap-7 text-sm md:flex">
            {nav.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-slate-700 transition-colors hover:text-amber-600 dark:text-stone-300"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <ThemeSwitcher />
            <Button
              className="hidden bg-amber-600 text-white hover:bg-amber-700 md:inline-flex"
              onClick={() => {
                document.getElementById('reserve')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Reserve a Table
            </Button>
            <button
              className="rounded-md p-2 md:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {open ? <X className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
            </button>
          </div>
        </div>
        {open && (
          <div className="border-t border-stone-200 px-4 py-3 md:hidden dark:border-stone-800">
            <div className="flex flex-col gap-3 text-sm">
              {nav.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="hover:text-amber-600"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <a href="#reserve" className="font-semibold text-amber-600" onClick={() => setOpen(false)}>
                Reserve a Table
              </a>
            </div>
          </div>
        )}
      </header>

      <main>
        {/* --------------------------------------------------------------- */}
        {/* Hero                                                            */}
        {/* --------------------------------------------------------------- */}
        <section className="relative isolate overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <img
              src={HERO_IMAGE}
              alt="Chef plating handmade pasta"
              className="h-full w-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/45 to-black/70" />
          </div>
          <div className="mx-auto flex min-h-[78vh] max-w-7xl flex-col items-center justify-center px-4 py-24 text-center sm:px-6">
            <Badge className="mb-5 border-amber-300/40 bg-white/10 text-xs uppercase tracking-[0.22em] text-amber-100 backdrop-blur hover:bg-white/10">
              Established 2012 · Reservations Open
            </Badge>
            <h1
              className="max-w-4xl text-4xl font-semibold leading-tight text-white sm:text-6xl md:text-7xl"
              style={{ fontFamily: '"Playfair Display", serif' }}
            >
              A Modern Italian Kitchen,
              <span className="block italic text-amber-200">Rooted in Tradition.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base text-stone-200 sm:text-lg">
              Handmade pasta, wood-fired pizza, and seasonal plates — served in
              a warm, candlelit room on the corner of Mercer &amp; Prince.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button
                size="lg"
                className="bg-amber-600 px-6 text-white hover:bg-amber-700"
                onClick={() => {
                  document.getElementById('reserve')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                <Calendar className="mr-2 h-4 w-4" /> Book a Table
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/40 bg-white/10 text-white backdrop-blur hover:bg-white/20 hover:text-white"
                onClick={() => {
                  document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                View the Menu
              </Button>
            </div>
            <div className="mt-10 flex items-center gap-2 text-sm text-stone-200">
              <Star className="h-4 w-4 fill-amber-300 text-amber-300" />
              <Star className="h-4 w-4 fill-amber-300 text-amber-300" />
              <Star className="h-4 w-4 fill-amber-300 text-amber-300" />
              <Star className="h-4 w-4 fill-amber-300 text-amber-300" />
              <Star className="h-4 w-4 fill-amber-300 text-amber-300" />
              <span className="ml-2">4.9 · 1,200+ diners</span>
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------------- */}
        {/* Highlights                                                      */}
        {/* --------------------------------------------------------------- */}
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <div className="grid gap-6 md:grid-cols-3">
            {highlights.map(({ icon: Icon, title, desc }) => (
              <Card
                key={title}
                className="border-stone-200 bg-white shadow-sm dark:border-stone-800 dark:bg-stone-900"
              >
                <CardContent className="p-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3
                    className="mt-4 text-xl font-semibold"
                    style={{ fontFamily: '"Playfair Display", serif' }}
                  >
                    {title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 dark:text-stone-300">{desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* --------------------------------------------------------------- */}
        {/* Our Story                                                       */}
        {/* --------------------------------------------------------------- */}
        <section
          id="story"
          className="border-y border-stone-200 bg-white py-20 dark:border-stone-800 dark:bg-stone-950"
        >
          <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center">
            <div className="overflow-hidden rounded-2xl shadow-lg">
              <img
                src={STORY_IMAGE}
                alt="Our pasta room"
                className="h-[520px] w-full object-cover"
                loading="lazy"
              />
            </div>
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-amber-600">
                Our Story
              </p>
              <h2
                className="text-3xl font-semibold tracking-tight sm:text-4xl"
                style={{ fontFamily: '"Playfair Display", serif' }}
              >
                A little corner of Emilia-Romagna, right here in the city.
              </h2>
              <p className="mt-5 text-slate-600 dark:text-stone-300">
                Fiorella began as a weekend supper club in our founder&rsquo;s
                apartment — a single long table, a handful of friends, and a
                rolling pin from her grandmother&rsquo;s kitchen in Bologna. More
                than a decade later, the table is longer, but the recipes
                haven&rsquo;t changed.
              </p>
              <p className="mt-4 text-slate-600 dark:text-stone-300">
                Every sheet of pasta is still rolled by hand each morning.
                Sauces simmer for hours. Bread is pulled from the oven when you
                sit down, not before.
              </p>
              <div className="mt-7 flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-amber-100 p-2 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300">
                  <ChefHat className="h-full w-full" />
                </div>
                <div>
                  <p className="font-semibold">Chef Marco Fiorella</p>
                  <p className="text-sm text-slate-500 dark:text-stone-400">
                    Executive Chef &amp; Owner
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------------- */}
        {/* Menu                                                            */}
        {/* --------------------------------------------------------------- */}
        <section id="menu" className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
          <SectionHeading eyebrow="Seasonal Menu" title="From the Kitchen">
            A rotating selection of what&rsquo;s good right now. Our kitchen
            changes the menu with the seasons and the market.
          </SectionHeading>

          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {menu.map((cat) => (
              <button
                key={cat.category}
                onClick={() => setActiveCat(cat.category)}
                className={`rounded-full border px-5 py-2 text-sm font-medium transition ${
                  activeCat === cat.category
                    ? 'border-amber-600 bg-amber-600 text-white shadow'
                    : 'border-stone-300 bg-white text-slate-700 hover:border-amber-600 hover:text-amber-700 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-200'
                }`}
              >
                {cat.category}
              </button>
            ))}
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {current.items.map((item) => (
              <article
                key={item.name}
                className="group overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition hover:shadow-lg dark:border-stone-800 dark:bg-stone-900"
              >
                <div className="relative h-60 w-full overflow-hidden">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                    loading="lazy"
                  />
                  {item.tag && (
                    <span className="absolute left-4 top-4 rounded-full bg-amber-600 px-3 py-1 text-xs font-semibold text-white shadow">
                      {item.tag}
                    </span>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3
                      className="text-xl font-semibold"
                      style={{ fontFamily: '"Playfair Display", serif' }}
                    >
                      {item.name}
                    </h3>
                    <span className="font-semibold text-amber-700 dark:text-amber-400">
                      {item.price}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-slate-600 dark:text-stone-300">
                    {item.desc}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* --------------------------------------------------------------- */}
        {/* Gallery                                                         */}
        {/* --------------------------------------------------------------- */}
        <section
          id="gallery"
          className="border-y border-stone-200 bg-white py-20 dark:border-stone-800 dark:bg-stone-950"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <SectionHeading eyebrow="Gallery" title="Inside the Room" />
            <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
              {gallery.map((src, i) => (
                <div
                  key={src}
                  className={`overflow-hidden rounded-xl ${
                    i === 0 ? 'md:col-span-2 md:row-span-2' : ''
                  }`}
                >
                  <img
                    src={src}
                    alt=""
                    className={`w-full object-cover transition duration-500 hover:scale-105 ${
                      i === 0 ? 'h-full min-h-[320px]' : 'h-56'
                    }`}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------------- */}
        {/* Reviews                                                         */}
        {/* --------------------------------------------------------------- */}
        <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
          <SectionHeading eyebrow="Press" title="What people are saying" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {reviews.map((r) => (
              <Card
                key={r.name}
                className="border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-900"
              >
                <CardContent className="p-6">
                  <div className="mb-3 flex gap-0.5">
                    {Array.from({ length: r.stars }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <p
                    className="text-lg leading-relaxed text-slate-700 dark:text-stone-200"
                    style={{ fontFamily: '"Playfair Display", serif', fontStyle: 'italic' }}
                  >
                    {r.quote}
                  </p>
                  <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-400">
                    — {r.name}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* --------------------------------------------------------------- */}
        {/* Reservations                                                    */}
        {/* --------------------------------------------------------------- */}
        <section
          id="reserve"
          className="relative isolate overflow-hidden py-24"
        >
          <div className="absolute inset-0 -z-10">
            <img
              src="https://images.unsplash.com/photo-1559329007-40df8a9345d8?auto=format&fit=crop&w=1800&q=80"
              alt=""
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/70" />
          </div>
          <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center">
            <div className="text-white">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">
                Reservations
              </p>
              <h2
                className="text-4xl font-semibold sm:text-5xl"
                style={{ fontFamily: '"Playfair Display", serif' }}
              >
                Join us for dinner.
              </h2>
              <p className="mt-5 max-w-md text-stone-200">
                We open for bookings 30 days in advance. For parties of 7 or
                more, please call us directly.
              </p>
              <div className="mt-8 space-y-3 text-sm text-stone-200">
                <p className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-amber-300" /> (212) 555-0199
                </p>
                <p className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-amber-300" /> ciao@fiorella.nyc
                </p>
              </div>
            </div>

            <Card className="border-0 bg-white/95 shadow-2xl backdrop-blur dark:bg-stone-950/95">
              <CardContent className="p-8">
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    alert('Thank you! We\u2019ll confirm your reservation by email shortly.')
                  }}
                  className="space-y-4"
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-stone-400">
                        Date
                      </label>
                      <input
                        required
                        type="date"
                        className="mt-1 w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-sm dark:border-stone-700 dark:bg-stone-900"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-stone-400">
                        Time
                      </label>
                      <select
                        required
                        className="mt-1 w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-sm dark:border-stone-700 dark:bg-stone-900"
                      >
                        <option>5:00 pm</option>
                        <option>6:30 pm</option>
                        <option>7:00 pm</option>
                        <option>7:30 pm</option>
                        <option>8:00 pm</option>
                        <option>9:00 pm</option>
                        <option>9:30 pm</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-stone-400">
                        Party Size
                      </label>
                      <select
                        required
                        className="mt-1 w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-sm dark:border-stone-700 dark:bg-stone-900"
                      >
                        {[2, 3, 4, 5, 6].map((n) => (
                          <option key={n}>
                            {n} guests
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-stone-400">
                        Seating
                      </label>
                      <select
                        required
                        className="mt-1 w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-sm dark:border-stone-700 dark:bg-stone-900"
                      >
                        <option>Dining Room</option>
                        <option>Chef&rsquo;s Counter</option>
                        <option>Patio</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-stone-400">
                      Full Name
                    </label>
                    <input
                      required
                      type="text"
                      className="mt-1 w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-sm dark:border-stone-700 dark:bg-stone-900"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-stone-400">
                      Email
                    </label>
                    <input
                      required
                      type="email"
                      className="mt-1 w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-sm dark:border-stone-700 dark:bg-stone-900"
                    />
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-amber-600 text-white hover:bg-amber-700"
                  >
                    <Wine className="mr-2 h-4 w-4" />
                    Request Reservation
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* --------------------------------------------------------------- */}
        {/* Visit                                                           */}
        {/* --------------------------------------------------------------- */}
        <section
          id="contact"
          className="mx-auto max-w-7xl px-4 py-24 sm:px-6"
        >
          <div className="grid gap-12 md:grid-cols-3">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-amber-600">
                Visit
              </p>
              <h3
                className="text-2xl font-semibold"
                style={{ fontFamily: '"Playfair Display", serif' }}
              >
                Find Us
              </h3>
              <p className="mt-4 flex items-start gap-3 text-slate-600 dark:text-stone-300">
                <MapPin className="mt-1 h-4 w-4 text-amber-600" />
                <span>
                  120 Mercer Street
                  <br />
                  New York, NY 10012
                </span>
              </p>
              <p className="mt-3 flex items-center gap-3 text-slate-600 dark:text-stone-300">
                <Phone className="h-4 w-4 text-amber-600" />
                (212) 555-0199
              </p>
            </div>

            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-amber-600">
                Hours
              </p>
              <h3
                className="text-2xl font-semibold"
                style={{ fontFamily: '"Playfair Display", serif' }}
              >
                <Clock className="mr-2 inline h-5 w-5 text-amber-600" />
                Open Nightly
              </h3>
              <ul className="mt-4 space-y-2 text-sm text-slate-600 dark:text-stone-300">
                {hours.map((h) => (
                  <li key={h.day} className="flex justify-between border-b border-dashed border-stone-200 pb-2 dark:border-stone-800">
                    <span>{h.day}</span>
                    <span className="font-medium text-slate-900 dark:text-stone-100">
                      {h.time}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-amber-600">
                Private Dining
              </p>
              <h3
                className="text-2xl font-semibold"
                style={{ fontFamily: '"Playfair Display", serif' }}
              >
                Host with Us
              </h3>
              <p className="mt-4 text-sm text-slate-600 dark:text-stone-300">
                Our upstairs room seats 24 guests for private dinners, rehearsal
                dinners, and intimate celebrations. Custom menus on request.
              </p>
              <a
                href="mailto:events@fiorella.nyc"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-amber-700 hover:text-amber-800 dark:text-amber-400"
              >
                events@fiorella.nyc →
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* ----------------------------------------------------------------- */}
      {/* Footer                                                            */}
      {/* ----------------------------------------------------------------- */}
      <footer className="border-t border-stone-200 bg-white py-10 dark:border-stone-800 dark:bg-stone-950">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 sm:px-6 md:flex-row md:items-center">
          <div>
            <Logo />
            <p className="mt-2 text-sm text-slate-500 dark:text-stone-400">
              © 2026 Fiorella Restaurant. All rights reserved.
            </p>
          </div>
          <div className="flex items-center gap-4 text-slate-500 dark:text-stone-400">
            <a href="#" aria-label="Instagram" className="hover:text-amber-600">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="#" aria-label="Facebook" className="hover:text-amber-600">
              <Facebook className="h-5 w-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
