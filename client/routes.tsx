import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { AppTarget } from '@sesamiapp/app-message'

/*
    Lazy loading the components so that you can use different tools and technologies for 
    different targets and they are not included in your bundle.
*/
const Admin      = lazy(() => import('./components/admin.tsx'            ))
const HostLoader = lazy(() => import('./components/hosts/host-loader.tsx'))

export const AppRoutes = () => {

    const isDev = process.env.NODE_ENV === 'development'

    return (
        <Routes>

            {/* Admin - Authorized (disabled in dev mode) */}
            <Route
                path="/"
                element={isDev ? (
                    <Suspense fallback={<a>loading...</a>}>
                        <HostLoader target={AppTarget.ADMIN_APP_LOADER}>
                            <Admin/>
                        </HostLoader>
                    </Suspense>
                ) : (
                    <Suspense fallback={<a>loading...</a>}>
                        <Admin/>
                    </Suspense>
                )}
            />

            <Route
                path="*"
                element={<h4>Error - 404</h4>}
            />

        </Routes>
    )

}
