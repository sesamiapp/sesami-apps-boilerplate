import { AppRoutes } from './routes'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './style/index.scss'
import './style/theme.experience.scss'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <AppRoutes/>
        </BrowserRouter>
    </StrictMode>
)
