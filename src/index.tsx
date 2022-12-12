import { createRoot } from 'react-dom/client'
import 'tailwindcss/tailwind.css'
import App from 'components/App'
import Home from 'components/Home/Home'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Hub from 'components/Hub/Hub'

const container = document.getElementById('root') as HTMLElement
const root = createRoot(container)

//implement a browser react router here

// const Router = () => <RouterProvider value={router} />

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/home" element={<Hub />} />
    </Routes>
  </BrowserRouter>
)
