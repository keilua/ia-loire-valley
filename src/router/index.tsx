import { createBrowserRouter, Navigate } from 'react-router-dom'
import { MainLayout } from '../layouts/MainLayout'
import { HomePage } from '../pages/HomePage'
import { ExpertsPage } from '../pages/ExpertsPage'
import { ProjectPage } from '../pages/ProjectPage'
import { QuizPage } from '../pages/QuizPage'
import { DiscoverPage } from '../pages/DiscoverPage'
import { TrainingPage } from '../pages/TrainingPage'
import { AgendaPage } from '../pages/AgendaPage'
import { NewsPage } from '../pages/NewsPage'
import { LegalPage } from '../pages/LegalPage'
import { NotFoundPage } from '../pages/NotFoundPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'experts', element: <ExpertsPage /> },
      { path: 'lancer-projet', element: <ProjectPage /> },
      { path: 'quiz', element: <QuizPage /> },
      { path: 'decouvrir-ia', element: <DiscoverPage /> },
      { path: 'se-former', element: <TrainingPage /> },
      { path: 'agenda', element: <AgendaPage /> },
      { path: 'actualites', element: <NewsPage /> },
      { path: 'mentions-legales', element: <LegalPage /> },
      // Legacy redirects
      { path: 'projet', element: <Navigate to="/lancer-projet" replace /> },
      { path: 'diagnostic', element: <Navigate to="/quiz" replace /> },
      { path: 'decouvrir', element: <Navigate to="/decouvrir-ia" replace /> },
      { path: 'formations', element: <Navigate to="/se-former" replace /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
