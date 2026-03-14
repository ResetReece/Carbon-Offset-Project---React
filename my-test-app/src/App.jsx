import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'

export default function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>

      <footer></footer>
    </BrowserRouter>
  )
}
