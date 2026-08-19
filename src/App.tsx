import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import Fundraise from './pages/Fundraise'
import Chapters from './pages/Chapters'
import Leadership from './pages/Leadership'
import Connect from './pages/Connect'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="fundraise" element={<Fundraise />} />
          <Route path="chapters" element={<Chapters />} />
          <Route path="leadership" element={<Leadership />} />
          <Route path="connect" element={<Connect />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
