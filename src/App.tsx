import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Homepage from './pages/Homepage'
import Terminals from './pages/Terminals'
import Schedule from './pages/Schedule'
import FAQs from './pages/FAQs'

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/terminals" element={<Terminals />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/faqs" element={<FAQs />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
