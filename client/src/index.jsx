import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './components/App/App'
import { BrowserRouter } from 'react-router-dom'
import Test from './components/test'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <React.StrictMode>
            <Test />
            <App />
        </React.StrictMode>
    </BrowserRouter>
)
