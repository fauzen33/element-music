import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import {App} from './App.tsx'
import './index.css'
import './i18n'
import { Loading } from './components/UI/Loading/loading.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <Suspense fallback={<Loading/>}>
    <App />
    </Suspense>
    </BrowserRouter>
  </StrictMode>,
)
