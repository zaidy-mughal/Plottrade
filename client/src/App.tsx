import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Search from './pages/Search';
import Home from './pages/Home';
import Profile from './pages/Profile';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import About from './pages/About';
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';
import PageNotFound from './components/PageNotFound';
import CreateListing from './pages/CreateListing';
import Listing from './pages/Listing';
import Footer from './components/Footer';
import MyListings from './pages/MyListings';
import UpdateListing from './pages/UpdateListing';

export default function App(): React.JSX.Element {
  return (
    <BrowserRouter>
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
  );
}
