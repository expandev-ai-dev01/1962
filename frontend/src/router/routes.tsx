import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { LoadingSpinner } from '@/core/components/loading-spinner';
import { MainLayout } from '@/layouts/MainLayout';

const HomePage = lazy(() =>
  import('@/pages/Home').then((module) => ({ default: module.HomePage }))
);
const NotFoundPage = lazy(() =>
  import('@/pages/NotFound').then((module) => ({ default: module.NotFoundPage }))
);

// Meal Pages
const MealHistoryPage = lazy(() =>
  import('@/pages/Meal/History').then((module) => ({ default: module.MealHistoryPage }))
);
const MealCreatePage = lazy(() =>
  import('@/pages/Meal/Create').then((module) => ({ default: module.MealCreatePage }))
);
const MealDetailsPage = lazy(() =>
  import('@/pages/Meal/Details').then((module) => ({ default: module.MealDetailsPage }))
);

const routes = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense
        fallback={
          <div className="flex h-screen w-screen items-center justify-center">
            <LoadingSpinner />
          </div>
        }
      >
        <MainLayout />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'meals',
        children: [
          {
            index: true,
            element: <MealHistoryPage />,
          },
          {
            path: 'new',
            element: <MealCreatePage />,
          },
          {
            path: ':id',
            element: <MealDetailsPage />,
          },
        ],
      },
      {
        path: '*',
        element: (
          <Suspense
            fallback={
              <div className="flex h-full w-full items-center justify-center">
                <LoadingSpinner />
              </div>
            }
          >
            <NotFoundPage />
          </Suspense>
        ),
      },
    ],
  },
]);

export { routes };
