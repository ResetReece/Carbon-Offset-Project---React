import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./App.css"
import Home from "./pages/Home"
import Auth from "./pages/Auth"
import Account from "./pages/Account"
import Cart from "./pages/Cart"
import Products from "./pages/Products"
import Projects from "./pages/Projects"
import Company from "./pages/Company"
import Reviews from "./pages/Reviews"
import Checkout from "./pages/Checkout"
import Success from "./pages/Success"
import PrivacyPolicy from "./pages/Privacy-policy"
import TermsAndConditions from "./pages/Terms-and-conditions"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/account" element={<Account />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products" element={<Products />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/company" element={<Company />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/success" element={<Success />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
      </Routes>
    </BrowserRouter>
  )
}
