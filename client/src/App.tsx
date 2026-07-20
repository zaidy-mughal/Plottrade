import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Search from './pages/Search.jsx'
import Home from './pages/Home.jsx'
import Profile from './pages/Profile.jsx'
import SignUp from './pages/SignUp.jsx'
import SignIn from './pages/SignIn.jsx'
import About from './pages/About.jsx'
import Header from './components/Header.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import PageNotFound from './components/PageNotFound.jsx'
import CreateListing from './pages/CreateListing.jsx'
import Listing from './pages/Listing.jsx'
import Footer from './components/Footer.jsx'
import MyListings from './pages/MyListings.jsx'
import UpdateListing from './pages/UpdateListing.jsx'

export default function App() {
  return <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/create-listing" element={<CreateListing />} />
        <Route path="/listing/:listingId" element={<Listing />} />
        <Route path="/my-listings" element={<MyListings />} />
        <Route path="/update-listing/:listingId" element={<UpdateListing />} />
        <Route path="/search" element={<Search />} />
      </Route>
      <Route path="/about" element={<About />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
    <Footer />
  </BrowserRouter>
}
