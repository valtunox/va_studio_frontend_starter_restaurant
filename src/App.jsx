/**
 * VA Studio - Main Application Entry Point
 *
 * Public-first architecture: no login required.
 *
 * Routes:
 *   /                          → Welcome page (template gallery + hero)
 *   /preview/:templateId       → Live template preview (ecommerce, saas, portfolio, etc.)
 *
 * Backend connectivity:
 *   On mount, the app calls healthApi.check() to verify the FastAPI backend
 *   at http://localhost:5112 is running. A persistent status badge in the
 *   navbar shows "Online", "Offline", or "Degraded" in real-time.
 *   The status is polled every 30s (online) or 10s (offline).
 *
 * All 17 templates are loaded dynamically via React.lazy + code-splitting.
 * The welcome page serves as the entry point where users browse templates,
 * chat with AI, and request customizations — all without signing in.
 *
 * @module App
 * @version 1.1.0
 * @see {@link ../templates/} for individual template implementations
 * @see {@link ./pages/WelcomePage.jsx} for the template gallery
 * @see {@link ./hooks/useBackendStatus.js} for health-check logic
 * @see {@link ./lib/api.js} for backend API client
 */

import { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider, useParams, Link } from 'react-router-dom'
import { BackendStatusProvider } from './context/BackendStatusContext'
import WelcomePage from './pages/WelcomePage'

/* ------------------------------------------------------------------ */
/*  Lazy-loaded auth pages                                             */
/* ------------------------------------------------------------------ */

const LoginPage = lazy(() => import('./pages/auth/login/LoginPage.jsx'))
const RegisterPage = lazy(() => import('./pages/auth/register/RegisterPage.jsx'))

/* ------------------------------------------------------------------ */
/*  Lazy-loaded template components (code-split per template)          */
/* ------------------------------------------------------------------ */

const templates = {
  aiassistant: lazy(() => import('../templates/aiassistant/App.jsx')),
  ecommerce: lazy(() => import('../templates/ecommerce/App.jsx')),
  saas: lazy(() => import('../templates/saas/App.jsx')),
  portfolio: lazy(() => import('../templates/portfolio/App.jsx')),
  blog: lazy(() => import('../templates/blog/App.jsx')),
  crm: lazy(() => import('../templates/crm/App.jsx')),
  erp: lazy(() => import('../templates/erp/App.jsx')),
  social: lazy(() => import('../templates/social/App.jsx')),
  dashboard: lazy(() => import('../templates/dashboard/App.jsx')),
  nutrition: lazy(() => import('../templates/nutrition/App.jsx')),
  health: lazy(() => import('../templates/health/App.jsx')),
  diet: lazy(() => import('../templates/diet/App.jsx')),
  gym: lazy(() => import('../templates/gym/App.jsx')),
  sports: lazy(() => import('../templates/sports/App.jsx')),
  finance: lazy(() => import('../templates/finance/App.jsx')),
  accounting: lazy(() => import('../templates/accounting/App.jsx')),
  sales: lazy(() => import('../templates/sales/App.jsx')),
  marketing: lazy(() => import('../templates/marketing/App.jsx')),
  login: lazy(() => import('../templates/login/App.jsx')),
  register: lazy(() => import('../templates/register/App.jsx')),
  onboarding: lazy(() => import('../templates/onboarding/App.jsx')),
  leads: lazy(() => import('../templates/leads/App.jsx')),
}

/* ------------------------------------------------------------------ */
/*  Template Preview (resolves :templateId → component)                */
/* ------------------------------------------------------------------ */

function TemplateLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
      <div className="text-center">
        <div className="relative w-12 h-12 mx-auto mb-4">
          <div className="absolute inset-0 rounded-full border-4 border-indigo-200 dark:border-indigo-900" />
          <div className="absolute inset-0 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin" />
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Loading template...</p>
      </div>
    </div>
  )
}

function TemplatePreview() {
  const { templateId } = useParams()
  const Component = templates[templateId]

  if (!Component) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-6">
        <div className="text-center max-w-md">
          <p className="text-7xl font-black text-slate-200 dark:text-slate-800 font-display mb-2">404</p>
          <h1 className="text-2xl font-bold font-display mb-3 text-slate-900 dark:text-white">Template Not Found</h1>
          <p className="text-slate-500 dark:text-slate-400 mb-8">
            The template "<span className="font-mono text-indigo-600 dark:text-indigo-400">{templateId}</span>" doesn't exist.
            Available: {Object.keys(templates).join(', ')}.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-full font-medium hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-600/25"
          >
            ← Browse All Templates
          </Link>
        </div>
      </div>
    )
  }

  return (
    <Suspense fallback={<TemplateLoader />}>
      <Component />
    </Suspense>
  )
}

/* ------------------------------------------------------------------ */
/*  Router                                                             */
/*                                                                     */
/*  /                     → Welcome page with template gallery         */
/*  /preview/:templateId  → Live preview of a specific template        */
/* ------------------------------------------------------------------ */

const router = createBrowserRouter([
  { path: '/', element: <WelcomePage /> },
  { path: '/preview/:templateId', element: <TemplatePreview /> },
  { path: '/auth/login', element: <Suspense fallback={<TemplateLoader />}><LoginPage /></Suspense> },
  { path: '/auth/register', element: <Suspense fallback={<TemplateLoader />}><RegisterPage /></Suspense> },
])

/**
 * Root application component.
 *
 * Wraps the entire app in BackendStatusProvider so every page
 * can access the real-time backend connectivity status via
 * useBackendContext().
 */
export default function App() {
  return (
    <BackendStatusProvider>
      <RouterProvider router={router} />
    </BackendStatusProvider>
  )
}
